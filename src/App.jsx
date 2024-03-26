import React, { useState, useEffect } from "react";
import "./App.css";
import { afschijvingsMatrix } from "./utils/matrix";
function App() {
  const [value1, setValue1] = useState(""); // Schadebedrag
  const [deductible, setDeductible] = useState(""); // New field: Deductible
  const [value2, setValue2] = useState(31); // Percentage
  const [value3, setValue3] = useState(""); // 31% uitkomst
  const [value4, setValue4] = useState(""); // Afschijvingspercentage
  const [adjustedSchadebedrag, setAdjustedSchadebedrag] = useState(""); // Adjusted Schadebedrag for calculations
  const [purchaseDate, setPurchaseDate] = useState("");
  const [purchasePrice, setPurchasePrice] = useState("");
  const [kmCorrection, setKmCorrection] = useState(0); // New state for KM Correctie

  // Handler function for KM Correctie input field
  const handleKmCorrectionChange = (e) => {
    setKmCorrection(e.target.value);
  };
  // Update value1 and reset value3 and value5 when value1 changes
  const handleValue1Change = (e) => {
    setValue1(e.target.value);
  };

  // Handle change for Deductible field and recalculate adjusted Schadebedrag
  const handleDeductibleChange = (e) => {
    const newDeductible = e.target.value;
    setDeductible(newDeductible);
  };

  // Update value2 and recalculate value3 when value2 changes
  const handleValue2Change = (e) => {
    setValue2(e.target.value);
  };

  // Update value4 when value4 changes
  const handleValue4Change = (e) => {
    setValue4(e.target.value);
  };

  // Use useEffect to update adjustedSchadebedrag and related calculations whenever value1 or deductible changes
  useEffect(() => {
    const calcAdjustedSchadebedrag = value1 - deductible;
    setAdjustedSchadebedrag(calcAdjustedSchadebedrag);

    // Recalculate value3 with adjusted Schadebedrag
    if (calcAdjustedSchadebedrag && value2) {
      setValue3(
        ((calcAdjustedSchadebedrag * parseFloat(value2)) / 100).toString()
      );
    }
  }, [value1, deductible, value2]);

  // Update the calculateValue5 function to add kmCorrection to the final result
  const calculateValue5 = () => {
    if (adjustedSchadebedrag && value2 && value4) {
      const resultWithoutCorrection =
        (parseFloat(adjustedSchadebedrag) *
          (parseFloat(value4) - parseFloat(value2))) /
        100;
      // Parse kmCorrection as a float and add it to the result
      return (resultWithoutCorrection + parseFloat(kmCorrection)).toString();
    }
    return "";
  };

  // New handler functions for the date and price input fields
  const handlePurchaseDateChange = (e) => {
    setPurchaseDate(e.target.value);
  };

  const handlePurchasePriceChange = (e) => {
    setPurchasePrice(e.target.value);
  };

  // Function to calculate the number of months since the purchase date
  const calculateMonthsSincePurchase = (purchaseDate) => {
    const purchaseDateTime = new Date(purchaseDate).getTime();
    const currentTime = Date.now();
    const months = Math.floor(
      (currentTime - purchaseDateTime) / (1000 * 60 * 60 * 24 * 30)
    );
    return months;
  };

  // Function to find the corresponding percentage based on price and months
  const lookupPercentage = (price, months) => {
    // Find the correct price range
    const priceRange = afschijvingsMatrix.find(
      (range) => price >= range.minPrice && price < range.maxPrice
    );

    if (!priceRange) return "";

    // Calculate index based on the month (assumes that the matrix column increments are in 12 months step)
    const index = Math.min(
      Math.floor(months / 12),
      priceRange.percentages.length - 1
    );

    // Return the corresponding percentage
    return priceRange.percentages[index];
  };

  // Use useEffect to update value4 (Afschijvingspercentage) when purchaseDate or purchasePrice changes
  useEffect(() => {
    const monthsSincePurchase = calculateMonthsSincePurchase(purchaseDate);
    // Lookup the corresponding Afschijvingspercentage from the matrix based on price and months
    const afschijvingspercentage = lookupPercentage(
      purchasePrice,
      monthsSincePurchase
    );
    setValue4(afschijvingspercentage);
  }, [purchaseDate, purchasePrice]);

  // Derived state for value5
  const value5 = calculateValue5();

  return (
    <main className="flex justify-center items-center min-h-screen bg-slate-50 p-4">
      <div className="w-full max-w-4xl flex flex-row">
        <div className="w-2/3 flex flex-col pr-4">
          {" "}
          {/* Use 2/3 of the parent width */}
          <span>Schadebedrag</span>
          <input
            type="text"
            value={value1}
            onChange={handleValue1Change}
            className="p-2 border border-gray-300 rounded-md mb-6 w-100"
          />
          <span>Gebruikersschade</span>
          <input
            type="text"
            value={deductible}
            onChange={handleDeductibleChange}
            className="p-2 border border-gray-300 rounded-md mb-6"
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
          <span>KM Correctie</span>
          <input
            type="number"
            value={kmCorrection}
            onChange={handleKmCorrectionChange}
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
        <div className="w-1/3 flex flex-col pl-4 border-l border-gray-300">
          {" "}
          <span>Datum eerste toelating</span>
          <input
            type="date"
            value={purchaseDate}
            onChange={handlePurchaseDateChange}
            className="p-2 border border-gray-300 rounded-md mb-6"
          />
          <span>Prijs incl. Opties</span>
          <input
            type="number"
            value={purchasePrice}
            onChange={handlePurchasePriceChange}
            className="p-2 border border-gray-300 rounded-md mb-6"
          />
        </div>
      </div>
    </main>
  );
}

export default App;
