import React, { useState, useEffect } from "react";
import { fetchPaginatedData } from "../../api/instructor/instructorApi";

export default function Pagination(data, setData) {
  // const [data, setData] = useState([]);

  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 10; // Number of items per page

  // Logic to slice the data array based on the current page
  const indexOfLastItem = (page + 1) * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    const fetchData = async () => {
      const { items, count } = await fetchPaginatedData(page, itemsPerPage);
      setData(items);

      // Calculate total pages
      const totalPages = Math.ceil(count / itemsPerPage);
      setTotalPages(totalPages);
    };

    fetchData();
  }, [page]);

  const handlePrevPage = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    setPage(page + 1);
  };

  return (
    <div className="join float-right">
      <button className="join-item btn" onClick={handlePrevPage}>
        «
      </button>
      <button className="join-item btn">1</button>
      <button className="join-item btn">2</button>
      <button className="join-item btn">3</button>
      <button className="join-item btn">4</button>
      <button className="join-item btn" onClick={handleNextPage}>
        »
      </button>
    </div>
  );
}
