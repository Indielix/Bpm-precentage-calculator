import React, { useState } from "react";
import "./App.css";

function App() {
  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState(31);
  const [value3, setValue3] = useState("");
  const [value4, setValue4] = useState("");

  // Update value1 and reset value3 and value5 when value1 changes
  const handleValue1Change = (e) => {
    const newValue1 = e.target.value;
    setValue1(newValue1);
    if (value2) {
      const newValue3 = (parseFloat(newValue1) * parseFloat(value2)) / 100;
      setValue3(newValue3.toString());
    }
  };

  // Update value2 and recalculate value3 when value2 changes
  const handleValue2Change = (e) => {
    const newValue2 = e.target.value;
    setValue2(newValue2);
    if (value1) {
      const newValue3 = (parseFloat(value1) * parseFloat(newValue2)) / 100;
      setValue3(newValue3.toString());
    }
  };

  // Update value4 when value4 changes
  const handleValue4Change = (e) => {
    const newValue4 = e.target.value;
    setValue4(newValue4);
  };

  // Calculate value5 based on the values of value1, value2, and value4
  const calculateValue5 = () => {
    if (value1 && value2 && value4) {
      return (
        (parseFloat(value1) * (parseFloat(value4) - parseFloat(value2))) / 100
      );
    }
    return "";
  };

  // Derived state for value5
  const value5 = calculateValue5();

  return (
    <main className="flex justify-center items-center flex-col min-h-screen bg-slate-50 p-4 ">
      <div className="md:w-1/3 w-full flex flex-col">
        <span>Schadebedrag</span>
        <input
          type="text"
          value={value1}
          onChange={handleValue1Change}
          className="p-2 border border-gray-300 rounded-md mb-6 w-100"
        />
        <span>Percentage</span>
        <input
          type="text"
          value={value2}
          onChange={handleValue2Change}
          className="p-2 border border-gray-300 rounded-md mb-6"
        />
        <span>31% uitkomst</span>
        <input
          disabled
          type="text"
          value={value3}
          onChange={(e) => setValue3(e.target.value)}
          className="p-2 border border-gray-300 rounded-md mb-6"
        />
        <span>Afschijvingspercentage</span>
        <input
          type="text"
          value={value4}
          onChange={handleValue4Change}
          className="p-2 border border-gray-300 rounded-md mb-6"
        />
        <span>Afschrijvings uitkomst</span>
        <input
          disabled
          type="text"
          value={value5.toString()}
          className="p-2 border border-gray-300 rounded-md mb-6"
        />
      </div>
    </main>
  );
}

export default App;
