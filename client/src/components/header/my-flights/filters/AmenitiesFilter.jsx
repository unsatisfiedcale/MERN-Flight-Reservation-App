import React from 'react';

const AmenitiesFilter = () => (
  <div className="absolute left-0 mt-2 w-64 bg-white border border-gray-300 rounded-lg shadow-lg p-4 z-40">
    <h2 className="text-lg font-semibold mb-2">Filter by Amenities</h2>
    <form>
      <div className="mb-2">
        <label htmlFor="amenity" className="block text-sm font-medium text-gray-700">Amenity:</label>
        <select
          id="amenity"
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
        >
          <option value="">Select Amenity</option>
          <option value="wifi">WiFi</option>
          <option value="meal">Meal</option>
          <option value="extra-legroom">Extra Legroom</option>
        </select>
      </div>
    </form>
  </div>
);

export default AmenitiesFilter;
