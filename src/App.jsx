function App() {
  // Логика трёх состояний сортировки
  function getNextSort(current, clickedField) {
    if (current.field !== clickedField) {
      return { field: clickedField, order: "asc" };
    }
    if (current.order === "asc") return { field: clickedField, order: "desc" };
    return { field: null, order: null };
  };
};
export default App;
