import React, { useState, useRef, useEffect } from "react";
import TimeFilter from "./filters/TimeFilter";
import StopFilter from "./filters/StopFilter";
import AirlinesFilter from "./filters/AirlinesFilter";
import AirportsFilter from "./filters/AirportsFilter";
import AmenitiesFilter from "./filters/AmenitiesFilter";
import { Rate } from "antd";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  // Aktif filtre öğesinin durumunu ve diğer durumları yönetir
  const [activeItem, setActiveItem] = useState(null);
  const [showFilters, setShowFilters] = useState(true);
  const [ratingValue, setRatingValue] = useState(3);
  const containerRef = useRef(null);

  // Filtre düğmesine tıklama işlevi
  const handleClick = (item) => {
    setActiveItem(activeItem === item ? null : item);
  };

  // Filtreleri açıp kapama işlevi
  const handleEditSearchClick = () => {
    setShowFilters((prev) => !prev);
  };

  // Dışarıya tıklanma durumunu kontrol ederek aktif öğeyi sıfırlama işlevi
  const handleClickOutside = (event) => {
    if (containerRef.current && !containerRef.current.contains(event.target)) {
      setActiveItem(null);
    }
  };

  // Bileşen yüklendiğinde ve kaldırıldığında dış tıklama olaylarını yönetir
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-white p-4">
      <div
        ref={containerRef} // Referans, dış tıklama olayları için kullanılır
        className="flex flex-col sm:flex-row sm:justify-between"
      >
        <div className="flex flex-row flex-wrap gap-2 sm:gap-4">
          {/* Filtreler görüntüleniyorsa */}
          {showFilters && (
            <>
              {/* Zaman filtresi */}
              <div className="relative flex-1 min-w-[110px]">
                <button
                  onClick={() => handleClick("Times")}
                  className="bg-white border border-gray-100 hover:border-gray-400 text-gray-800 font-sans rounded-lg shadow-sm transition duration-150 ease-in-out w-full text-center"
                >
                  Times
                </button>
                {activeItem === "Times" && <TimeFilter />}
              </div>

              {/* Durak filtresi */}
              <div className="relative flex-1 min-w-[110px]">
                <button
                  onClick={() => handleClick("Stop")}
                  className="bg-white border border-gray-100 hover:border-gray-400 text-gray-800 font-sans rounded-lg shadow-sm transition duration-150 ease-in-out w-full text-center"
                >
                  Stop
                </button>
                {activeItem === "Stop" && <StopFilter />}
              </div>

              {/* Havayolu filtresi */}
              <div className="relative flex-1 min-w-[110px]">
                <button
                  onClick={() => handleClick("Airlines")}
                  className="bg-white border border-gray-100 hover:border-gray-400 text-gray-800 font-sans rounded-lg shadow-sm transition duration-150 ease-in-out w-full text-center"
                >
                  Airlines
                </button>
                {activeItem === "Airlines" && <AirlinesFilter />}
              </div>

              {/* Havalimanı filtresi */}
              <div className="relative flex-1 min-w-[110px]">
                <button
                  onClick={() => handleClick("Airports")}
                  className="bg-white border border-gray-100 hover:border-gray-400 text-gray-800 font-sans rounded-lg shadow-sm transition duration-150 ease-in-out w-full text-center"
                >
                  Airports
                </button>
                {activeItem === "Airports" && <AirportsFilter />}
              </div>

              {/* Olanaklar filtresi */}
              <div className="relative flex-1 min-w-[110px]">
                <button
                  onClick={() => handleClick("Amenities")}
                  className="bg-white border border-gray-100 hover:border-gray-400 text-gray-800 font-sans rounded-lg shadow-sm transition duration-150 ease-in-out w-full text-center"
                >
                  Amenities
                </button>
                {activeItem === "Amenities" && <AmenitiesFilter />}
              </div>
            </>
          )}

          {/* Arama düzenleme düğmesi */}
          <h1
            className="min-w-[110px] text-blue-600 font-bold mr-2 cursor-pointer flex items-center select-none"
            onClick={handleEditSearchClick}
            style={{ userSelect: "none" }}
          >
            Edit Search
            {/* Ok simgesi ve dönüş hareketi */}
            <span
              className={`ml-2 inline-block transition-transform duration-300 ${
                showFilters ? "rotate-90" : "rotate-270"
              }`}
              style={{ fontSize: "0.75rem" }}
            >
              <FontAwesomeIcon icon={faChevronDown} />
            </span>
          </h1>
        </div>

        {/* Filtreler görünürse değerlendirme yıldızları */}
        <div className="mt-2">
          {showFilters && (
            <div className="mr-2">
              <Rate
                onChange={setRatingValue}
                value={ratingValue}
                style={{ fontSize: "20px" }}
              />
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
