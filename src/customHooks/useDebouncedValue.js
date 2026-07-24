import { useEffect, useState } from "react";

// Хук позволяет отложить выполнение действия до момента, когда пользователь прекратит взаимодействие с элементом
export const useDebounce = (value, delay = 500) => {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    // Функция отчистки. Отменяет таймер, если зависимости изменились
    return () => clearTimeout(timeoutId);
  }, [value, delay]);
  return debounceValue;
};
