import { useMemo } from "react";
import { applyClientFilters } from "./utils/applyClientFilters";

const { users, total, loading, error } = useUsers({
  sort,
  filters,
  page,
  limit,
});

const visibleUsers = useMemo(
  () => applyClientFilters(users, filters),
  [users, filters.age, filters.tel],
);

function App() {
  // Логика трёх состояний сортировки
  function getNextSort(current, clickedField) {
    if (current.field !== clickedField) {
      return { field: clickedField, order: "asc" };
    }
    if (current.order === "asc") return { field: clickedField, order: "desc" };
    return { field: null, order: null };
  }


return (
  <Pagination
    currentPage={page}
    totalItems={total}
    itemsPerPage={limit}
    onPageChange={setPage}
    onItemsPerPageChange={(newLimit) => {
      setLimit(newLimit);
      setPage(1);
    }}
  />
);
}
export default App;
