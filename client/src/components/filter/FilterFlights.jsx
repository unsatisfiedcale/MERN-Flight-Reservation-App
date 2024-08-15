import React from "react";
import FilterSelect from "./filterOptions/FilterSelect";
import FilterRadioGroup from "./filterOptions/FilterRadioGroup";
import FilterRange from "./filterOptions/FilterRange";

const FilterFlights = ({ airlines, onAirlineSelect }) => {
  // Sıralama seçenekleri
  const selectOptions = [
    { value: "lowest-price", label: "Lowest Price" },
    { value: "highest-price", label: "Highest Price" },
    { value: "recommended", label: "Recommended" },
  ];

  // Varsayılan havayolu seçenekleri
  const defaultAirlines = [
    { value: "turkish-airlines", label: "Turkish Airlines", price: "$230" },
    { value: "emirates", label: "Emirates", price: "$230" },
  ];

  // Havayolu seçeneklerini oluştur
  const airlineOptions =
    airlines.length > 0
      ? airlines.map((airline) => ({
          value: airline.iataCode,
          label: `${airline.name} - $230`,
        }))
      : defaultAirlines;

  // Havayolu seçim değişikliğini işleyen fonksiyon
  const handleAirlineChange = (event) => {
    onAirlineSelect(event.target.value); // Seçilen havayolu bilgisini ilet
  };

  return (
    <div className="p-4 max-h-[500px] overflow-y-auto">
      {/* Filtreleme başlığı */}
      <h2 className="text-lg font-bold mb-4">Filtreleme Seçenekleri</h2>
      {/* Sıralama seçeneği */}
      <FilterSelect options={selectOptions} />

      {/* Varış zamanı filtresi */}
      <div className="mb-4">
        <FilterRadioGroup
          title="Arrival Time"
          name="arrival-time"
          options={[
            { value: "5:00 AM - 11:59 PM", label: "5:00 AM - 11:59 PM" },
            { value: "12:00 PM - 5:59 PM", label: "12:00 PM - 5:59 PM" },
          ]}
        />
      </div>

      {/* Durak sayısı filtresi */}
      <div className="mb-4">
        <FilterRadioGroup
          title="Stops"
          name="stops"
          options={[
            { value: "nonstop", label: "Nonstop", price: "$230" },
            { value: "1-stop", label: "1 Stop", price: "$230" },
            { value: "2+-stop", label: "2+ Stops", price: "$230" },
          ]}
        />
      </div>

      {/* Havayolu filtresi */}
      <div className="mb-4">
        <FilterRadioGroup
          title="Airlines Included"
          name="airlines"
          options={airlineOptions} // Havayolu seçeneklerini kullan
          onChange={handleAirlineChange} // Seçim değişikliğini yönet
        />
      </div>

      <div className="mb-20">
        <FilterRange />
      </div>
    </div>
  );
};

export default FilterFlights;
