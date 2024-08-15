import React from 'react';

const AirlinesFilter = () => (
  <div className="absolute left-0 mt-2 w-64 bg-white border border-gray-300 rounded-lg shadow-lg p-4 z-40">
    <h2 className="text-lg font-semibold mb-2">Filter by Airlines</h2>
    <form>
      <div className="mb-2">
        <label htmlFor="airline" className="block text-sm font-medium text-gray-700">Airline:</label>
        <select
          id="airline"
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
        >
          <option value="">Select Airline</option>
          <option value="delta">Delta</option>
          <option value="united">United</option>
          <option value="american">American</option>
        </select>
      </div>
    </form>
  </div>
);

export default AirlinesFilter;
