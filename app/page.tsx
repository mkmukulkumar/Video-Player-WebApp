"use client"
import React, { useState } from "react";
import ListView from "./components/ListView";
import { data } from "./videodata/videodata";
export default function Page() {
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredData, setFilteredData] = useState(data);

    const handleSearch = (event: { target: { value: string }; }) => {
      const searchText = event.target.value;
      setSearchTerm(searchText);

      const filtered = data.filter((item) =>
      item.title.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredData(filtered);
    };
    
  return (
    <div className="flex flex-col items-center">
      <div className="z-10 px-48 sticky top-0 flex items-center w-full justify-between bg-violet-800 py-5">
        <h1 className="font-black mx-3">Video Player</h1>
        <i className="bi bi-grid-fill"></i>
        <input className="h-10 w-4/6 px-3 text-black"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearch}
          /> 
      </div>
      <ListView data={filteredData} />
    </div>
  );
}
