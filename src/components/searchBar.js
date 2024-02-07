import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const SearchBar = ({ onSearch }) => {
  const [fromDate, setFromDate] = useState(
    new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
  );
  const [toDate, setToDate] = useState(new Date());

  const handleSearch = () => {
    onSearch(fromDate, toDate);
  };

  return (
    <div className="flex flex-row gap-5">
      <div className="border border-2 border-gray-100 rounded-md">
        <DatePicker
          className="px-3 py-1"
          selected={fromDate}
          onChange={(date) => setFromDate(date)}
          dateFormat="yyyy-MM-dd"
        />
      </div>
      <span className="relative top-1"> to </span>
      <div className="border border-2 border-gray-100 rounded-md">
        <DatePicker
          className="px-3 py-1"
          selected={toDate}
          onChange={(date) => setToDate(date)}
          dateFormat="yyyy-MM-dd"
        />
      </div>
      <button
        className="bg-[#464585] px-4 py-2 rounded-lg text-white"
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
