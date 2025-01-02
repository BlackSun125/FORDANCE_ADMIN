import React from "react";

export default function Pagination({ 
  totalRows,
  itemsPerPage,
  onPageChange,
  currentPage, 
}) { 
 
  const totalPages = Math.ceil(totalRows / itemsPerPage);
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }
  
  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  const handleClick = (page) => {
    onPageChange(page);
  };

  return (
    <div className="join float-right">
      <button
        className="join-item btn"
        onClick={() => {
          onPageChange(1);
        }}
      >
        «
      </button>

      <button className="join-item btn" onClick={handlePrevPage}>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M15 6L9 12L15 18" stroke="#33363F" stroke-width="2" />
        </svg>
      </button>
      {pageNumbers.map((number) => {
        if (number === currentPage) {
          return (
            <button
              className="join-item btn btn-active"
              key={number}
              onClick={() => handleClick(number)}
            >
              <strong>{number}</strong>
            </button>
          );
        } else if (
          number === 1 ||
          number === totalPages ||
          (number >= currentPage - 2 && number <= currentPage + 2)
        ) {
          return (
            <button
              className="join-item btn"
              key={number}
              onClick={() => handleClick(number)}
            >
              {number}
            </button>
          );
        } else if (number === currentPage - 3 || number === currentPage + 3) {
          return (
            <button className="join-item btn" key={number}>
              ...
            </button>
          );
        }
        return null;
      })}
      <button className="join-item btn" onClick={handleNextPage}>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9 6L15 12L9 18" stroke="#33363F" stroke-width="2" />
        </svg>
      </button>
      <button
        className="join-item btn"
        onClick={() => {
          onPageChange(totalPages);
        }}
      >
        »
      </button>
    </div>
  );
}
