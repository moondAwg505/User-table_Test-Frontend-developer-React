import React, { useState } from "react";

export const Pagination = () => {
  const [cuurentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totlaItems = 50;
  const totalPages = Math.ceil(totlaItems / itemsPerPage);

  // Функция для изменения текущей страницы
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <section className="pagination">
      <button
        onClick={() => handlePageChange(cuurentPage - 1)}
        disabled={cuurentPage === 1}
      >
        Previous
      </button>
    {Array.from({length: totalPages}), (_, index) => (
        <button
        key={index + 1}
        onClick={() => handlePageChange(index + 1)}
        className={cuurentPage === index + 1 ? 'active' : ''}
        >
            {index + 1}
        </button>
    )}

      <button
        onClick={() => handlePageChange(cuurentPage - 1)}
        disabled={cuurentPage === 1}
      >
        Next
      </button>
      <select>
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="30">30</option>
        <option value="40">40</option>
        <option value="50">50</option>
      </select>
    </section>
  );
};

export default Pagination;
