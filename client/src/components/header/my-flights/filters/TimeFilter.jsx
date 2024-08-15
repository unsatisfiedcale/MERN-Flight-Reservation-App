import React from 'react';

const TimeFilter = () => (
  <div className="absolute left-0 mt-2 w-64 bg-white border border-gray-300 rounded-lg shadow-lg p-4 z-40">
    <h2 className="text-lg font-semibold mb-2">Filter by Time</h2>
    <form>
      <div className="mb-2">
        <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date:</label>
        <input
          type="date"
          id="date"
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
        />
      </div>
      <div className="mb-2">
        <label htmlFor="time" className="block text-sm font-medium text-gray-700">Time:</label>
        <input
          type="time"
          id="time"
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
        />
      </div>
    </form>
  </div>
);

export default TimeFilter;
