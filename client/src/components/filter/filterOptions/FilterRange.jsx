import React from "react";

const FilterRange = ({ min, max, step }) => (
  <div className="mb-4">
    <label className="block text-sm font-bold text-gray-800 mb-2">
      Price Range
    </label>
    <input type="range" min={min} max={max} step={step} className="w-full" />
    {/* Minimum ve maksimum değerler */}  
    <div className="flex justify-between text-sm text-gray-700 mt-1">
      <span>${min}</span>
      <span>${max}</span>
    </div>
  </div>
);

export default FilterRange;
