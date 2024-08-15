import React from 'react';

const StopFilter = () => (
  <div className="absolute left-0 mt-2 w-64 bg-white border border-gray-300 rounded-lg shadow-lg p-4 z-40">
    <h2 className="text-lg font-semibold mb-2">Filter by Stop</h2>
    <form>
      <div className="mb-2">
        <label htmlFor="stop-type" className="block text-sm font-medium text-gray-700">Stop Type:</label>
        <select
          id="stop-type"
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
        >
          <option value="">Select Stop Type</option>
          <option value="direct">Direct</option>
          <option value="layover">Layover</option>
        </select>
      </div>
      <div className="mb-2">
        <label htmlFor="stop-duration" className="block text-sm font-medium text-gray-700">Stop Duration:</label>
        <input
          type="number"
          id="stop-duration"
          placeholder="Hours"
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
        />
      </div>
    </form>
  </div>
);

export default StopFilter;
