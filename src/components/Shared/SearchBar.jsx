import React from "react";
import { FiSearch } from "react-icons/fi";

const SearchBar = ({ placeholder, searchTerm, setSearchTerm }) => {
  return (
    <div className="flex items-center bg-gray-100 border rounded-full px-4 py-2 shadow-md w-full sm:w-96">
      <FiSearch className="text-gray-500 text-lg mr-2" />
      <input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="bg-transparent outline-none flex-grow text-sm text-gray-700"
      />
    </div>
  );
};

export default SearchBar;
