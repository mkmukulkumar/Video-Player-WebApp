"use client"
import React, { useState } from "react";
import ListView from "./components/ListView";
import { data } from "./videoData/videodata";
export default function Page() {
  //state variables
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredData, setFilteredData] = useState(data);
  //handle search
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
      <div className="z-10 px-2 md:px-10 xl:px-48 lg:px-28 sticky top-0 flex items-center w-full justify-between bg-violet-800 py-5 z-20">
        <h1 className="font-black ">Video Player</h1>
        <i className="bi bi-grid-fill"></i>
        <input className="h-10 w-4/6 px-3 text-black rounded-lg"
                placeholder="Search"
                value={searchTerm}
                onChange={handleSearch}
          /> 
      </div>
      <ListView data={filteredData} search={searchTerm} />
    </div>
  );
}
