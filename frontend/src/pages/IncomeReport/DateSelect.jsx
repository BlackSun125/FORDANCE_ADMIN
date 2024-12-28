import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function DateSelect({ handleDateSelect }) {
  const [selectedOption, setSelectedOption] = useState("custom");
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [selectedYear, setSelectedYear] = useState(new Date());
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const handleCustomDateSelect = () => {
    handleDateSelect({ startDate, endDate });
  };

//   const renderDatePicker = () => {
//     if (selectedOption === "month") {
//       return (
//         <DatePicker
//           selected={selectedMonth}
//           onChange={(date) => setSelectedMonth(date)}
//           dateFormat="MM/yyyy"
//           showMonthYearPicker
//         />
//       );
//     } else if (selectedOption === "year") {
//       return (
//         <DatePicker
//           selected={selectedYear}
//           onChange={(date) => setSelectedYear(date)}
//           dateFormat="yyyy"
//           showYearPicker
//         />
//       );
//     } else {
//       return (
//         <div>
//           <DatePicker
//             selected={startDate}
//             selectsStart
//             startDate={startDate}
//             endDate={endDate}
//             onChange={(date) => setStartDate(date)}
//             dateFormat="dd/MM/yyyy"
//           />
//           <DatePicker
//             selected={endDate}
//             selectsEnd
//             startDate={startDate}
//             endDate={endDate}
//             onChange={(date) => setEndDate(date)}
//             dateFormat="dd/MM/yyyy"
//           />
//           <button onClick={handleCustomDateSelect}>Apply</button>
//         </div>
//       );
//     }
//   };

  return (
    <div>
      <select
        className="select select-bordered w-full max-w-xs"
        onChange={(e) => setSelectedOption(e.target.value)}
      >
        <option value="month">Month</option>
        <option value="year">Year</option>
        <option value="custom">Custom Range</option>
      </select>
      {selectedOption === "month" ? (
        <DatePicker
          selected={selectedMonth}
          onChange={(date) => setSelectedMonth(date)}
          dateFormat="MM/yyyy"
          showMonthYearPicker
        />
      ) : selectedOption === "year" ? (
        <DatePicker
          selected={selectedYear}
          onChange={(date) => setSelectedYear(date)}
          dateFormat="yyyy"
          showYearPicker
        />
      ) : (
        <div>
          <DatePicker
            selected={startDate}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            onChange={(date) => setStartDate(date)}
            dateFormat="dd/MM/yyyy"
          />
          <DatePicker
            selected={endDate}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            onChange={(date) => setEndDate(date)}
            dateFormat="dd/MM/yyyy"
          />
          <button onClick={handleCustomDateSelect}>Apply</button>
        </div>
      )}
      {/* {renderDatePicker()} */}
    </div>
  );
}
