import React from "react";

const FilterRadioGroup = ({ title, name, options, onChange }) => (
  <div className="mb-4">
    <h3 className="text-sm font-bold text-gray-800 mb-2">{title}</h3>
    <div className="flex flex-col space-y-2">
      {/* Seçeneklerin render edilmesi */}
      {options.map((option) => (
        <label key={option.value} className="flex items-center">
          <input
            type="radio"
            name={name}
            value={option.value}
            className="mr-2 h-4 w-4 accent-purple-700 border border-purple-800 rounded-full appearance-none checked:bg-purple-700 checked:border-purple-700"
            onChange={onChange}
          />
          <span className="text-sm text-gray-700">{option.label}</span>
          {option.price && (
            <span className="ml-2 text-gray-500">{option.price}</span>
          )}
        </label>
      ))}
    </div>
  </div>
);

export default FilterRadioGroup;
