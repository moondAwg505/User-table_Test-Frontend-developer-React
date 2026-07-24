import { useState, useRef, useCallback, useEffect } from "react";

const MIN_COLUMN_WIDTH = 50;

export function useColumnResize(initialWidths) {
  const [widths, setWidths] = useState(initialWidths);

  // Зеркалим widths в ref, чтобы startResize мог прочитать актуальное
  // значение, не завися от widths напрямую (иначе startResize
  // пересоздавался бы на каждый мелкий сдвиг мыши во время драга)
  const widthsRef = useRef(widths);
  useEffect(() => {
    widthsRef.current = widths;
  }, [widths]);

  // Что сейчас ресайзится: ключ колонки, стартовая позиция мыши,
  // стартовая ширина. В ref, а не в state — потому что это меняется
  // только внутри обработчиков, компоненту не нужно из-за этого перерисовываться
  const resizingRef = useRef(null);

  const handleMouseMove = useCallback((event) => {
    if (!resizingRef.current) return;
    const { key, startX, startWidth } = resizingRef.current;
    const delta = event.clientX - startX;
    const newWidth = Math.max(MIN_COLUMN_WIDTH, startWidth + delta);

    setWidths((prev) => ({ ...prev, [key]: newWidth }));
  }, []);

  const handleMouseUp = useCallback(() => {
    resizingRef.current = null;
    document.body.style.userSelect = "";
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", handleMouseUp);
  }, [handleMouseMove]);

  const startResize = useCallback(
    (key, startX) => {
      resizingRef.current = {
        key,
        startX,
        startWidth: widthsRef.current[key],
      };
      // без этого при быстром движении мыши браузер начнёт
      // выделять текст на странице, как будто ты его лениво зажал
      document.body.style.userSelect = "none";
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    },
    [handleMouseMove, handleMouseUp]
  );

  // если компонент размонтируется прямо во время драга (человек
  // ушёл со страницы, не отпустив мышь) — не оставляем "подвисшие"
  // слушатели на window
  useEffect(() => {
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  return { widths, startResize };
}