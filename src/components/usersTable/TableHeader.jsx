import { COLUMNS } from "../../utils/constants";

export const TableHeader = ({ sort, onSortChange, onResizeStart }) => {
  return (
    <thead>
      <tr>
        {COLUMNS.map((column, index) => {
          const isLast = index === COLUMNS.length - 1;
          const isActive = sort.field === column.key;

          return (
            <th key={column.key}>
              {column.sortable ? (
                <button type="button" onClick={() => onSortChange(column.key)}>
                  {column.label}
                  {isActive && (sort.order === "asc" ? " ↑" : " ↓")}
                </button>
              ) : (
                column.label
              )}
              {!isLast && (
                <span
                  className="resize-handle"
                  onMouseDown={(e) => onResizeStart(column.key, e.clientX)}
                />
              )}
            </th>
          );
        })}
      </tr>
    </thead>
  );
};
