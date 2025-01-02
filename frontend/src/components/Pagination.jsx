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
        className="join-item btn text-black border-gray-300 bg-gray-200 hover:bg-gray-300"
        onClick={() => {
          onPageChange(1);
        }}
      >
        «
      </button>

      <button
        className="join-item btn text-black border-gray-300 bg-gray-200 hover:bg-gray-300"
        onClick={handlePrevPage}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M15 6L9 12L15 18" stroke="#33363F" strokeWidth="2" />
        </svg>
      </button>
      {pageNumbers.map((number) => {
        if (number === currentPage) {
          return (
            <button
              className="join-item btn text-white bg-blue-500 border-blue-500 hover:bg-blue-600"
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
              className="join-item btn text-black border-gray-300 bg-gray-200 hover:bg-gray-300"
              key={number}
              onClick={() => handleClick(number)}
            >
              {number}
            </button>
          );
        } else if (number === currentPage - 3 || number === currentPage + 3) {
          return (
            <button className="join-item btn text-black bg-gray-100" key={number}>
              ...
            </button>
          );
        }
        return null;
      })}
      <button
        className="join-item btn text-black border-gray-300 bg-gray-200 hover:bg-gray-300"
        onClick={handleNextPage}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9 6L15 12L9 18" stroke="#33363F" strokeWidth="2" />
        </svg>
      </button>
      <button
        className="join-item btn text-black border-gray-300 bg-gray-200 hover:bg-gray-300"
        onClick={() => {
          onPageChange(totalPages);
        }}
      >
        »
      </button>
    </div>
  );
}
