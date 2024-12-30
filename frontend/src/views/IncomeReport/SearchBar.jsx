import React from "react";
import "./searchBarStyle.css";

export default function SearchBar({ handleSearch }) {
  return (
    <input
    className="search"
      type="text"
      placeholder="Search..."
      onChange={(e) => handleSearch(e.target.value)}
    />
  );
}
