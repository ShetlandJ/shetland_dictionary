import React from "react";

function SearchBar() {
  return (
    <div className="bg-gray-200">
      <div className="relative">
        <input
          type="text"
          className="h-14 w-96 pr-8 pl-5 rounded z-0 focus:shadow focus:outline-none"
          placeholder="Search a Shetland or English word..."
        />
      </div>
    </div>
  );
}

export default SearchBar;
