import axios from "axios";
import { useState, useEffect } from "react";
import { getAirlineNameFromIATA } from "../../utils/getAirlineName";
import calculateFlightDuration from '../../utils/calculateFlightDuration';
import { formatTime } from "../../utils/formatTime";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faTimes } from "@fortawesome/free-solid-svg-icons";
import DeltaLogo from '../../assets/delta.png';
import { Spin } from "antd";
import Swal from 'sweetalert2';

// ClassOptions bileşeni, uçuş kartındaki sınıf seçeneklerini görüntüler
const ClassOptions = ({ title, value }) => (
  <div className="bg-gray-100 border border-gray-200 rounded-lg p-4 text-center shadow-sm max-w-[100px] sm:max-w-[120px] flex-1">
    <span className="block text-base sm:text-lg font-semibold text-gray-900 mb-1 sm:mb-2">
      {value}
    </span>
    <span className="block text-xs sm:text-sm font-medium text-gray-700">
      {title}
    </span>
  </div>
);

// FlightDetailsCard bileşeni, uçuşun detaylarını gösterir
const FlightDetailsCard = ({ flight, onClose }) => (
  <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 shadow-md">
    <button
      className="text-red-500 font-semibold text-sm mb-4 hover:text-red-700"
      onClick={onClose}
    >
      Close
    </button>
    <div className="space-y-4">
      <div className="flex flex-col space-y-2">
        <div className="flex items-center">
          <span className="font-medium text-gray-900 w-32">Schedule Date:</span>
          <span className="text-gray-700">{flight.scheduleDate}</span>
        </div>
        <div className="flex items-center">
          <span className="font-medium text-gray-900 w-32">Flight Number:</span>
          <span className="text-gray-700">{flight.flightNumber}</span>
        </div>
        <div className="flex items-center">
          <span className="font-medium text-gray-900 w-32">Airline Code:</span>
          <span className="text-gray-700">{flight.prefixIATA}</span>
        </div>
        <div className="flex items-center">
          <span className="font-medium text-gray-900 w-32">Service Type:</span>
          <span className="text-gray-700">{flight.serviceType}</span>
        </div>
        <div className="flex items-center">
          <span className="font-medium text-gray-900 w-32">Flight ID:</span>
          <span className="text-gray-700">{flight.id}</span>
        </div>
      </div>
    </div>
  </div>
);

// FlightCard bileşeni, tek bir uçuşun özetini ve detaylarını gösterir
const FlightCard = ({ flight, toggleDetails, isDetailsVisible, onDelete }) => {
  const {
    flightDirection,
    route,
    scheduleDateTime,
    estimatedLandingTime,
    airline,
    flightDuration,
    flightName,
    id
  } = flight;

  // Varış ve kalkış havaalanlarını belirlenir
  const destinations = route?.destinations || [];
  const departureAirport = flightDirection === "D" ? "AMS" : destinations[0];
  const arrivalAirport =
    flightDirection === "A" ? "AMS" : destinations[destinations.length - 1];

  // Silme işlemi için onay penceresi ve API isteği
  const handleDelete = async () => {
    try {
      // Onay penceresi göster
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      });

      if (result.isConfirmed) {
        // Kullanıcı onay verirse, silme işlemini gerçekleştiriyoruz
        const response = await axios.delete('http://localhost:5001/server/flights/delete-flight', {
          data: { id } // Uçuş ID'sini gönder
        });

        if (response.data.message === 'Flight deleted successfully.') {
          // Başarı mesajını göster ve uçuşu listeden kaldır
          Swal.fire({
            title: "Deleted!",
            text: "Your flight has been deleted.",
            icon: "success"
          });
          onDelete(id); // Uçuşu listeden kaldır
        } else {
          // Hata durumunda mesaj göster
          Swal.fire({
            title: "Error!",
            text: "There was a problem deleting your flight.",
            icon: "error"
          });
        }
      }
    } catch (error) {
      // API isteği sırasında hata oluşursa mesaj göster
      console.error('Error deleting flight:', error.response ? error.response.data : error.message);
      Swal.fire({
        title: "Error!",
        text: "There was a problem deleting your flight.",
        icon: "error"
      });
    }
  };

  return (
    <div className="relative">
      <div className="bg-white shadow-md rounded-lg p-4 sm:p-6 flex flex-col sm:flex-row sm:items-start space-y-2 sm:space-y-0 sm:space-x-4 transition-transform duration-500 ease-in-out">
        <button
          className="absolute top-1 right-2 text-red-600 hover:text-red-700"
          aria-label="Delete Flight"
          onClick={handleDelete}
        >
          <FontAwesomeIcon icon={faTimes} className="text-lg" />
        </button>
        {/* Ana Kartın Üst ve Sol Kısımları */}
        <div className="flex-1 flex flex-col justify-between">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-none">
              <img src={DeltaLogo} alt="Delta Logo" className="mb-4" />
            </div>
            <div className="flex-1 ml-4 sm:ml-6 mt-3">
              <div className="flex items-center justify-between text-gray-900 font-medium text-lg sm:text-2xl">
                <span>
                  {estimatedLandingTime} - {scheduleDateTime}
                </span>
              </div>
              <div className="flex flex-col sm:flex-row text-gray-900 text-xs sm:text-sm mt-2 sm:mt-4 space-y-2 sm:space-y-0 sm:space-x-4">
                <div className="flex flex-col flex-1">
                  <div className="flex items-center whitespace-nowrap">
                    <span className="font-sans font-semibold">
                      {airline}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col flex-1">
                  <div className="flex items-center whitespace-nowrap">
                    <span className="font-sans">Nonstop</span>
                  </div>
                </div>
                <div className="flex flex-col flex-1">
                  <div className="flex items-center whitespace-nowrap">
                    <span className="font-sans">
                      {departureAirport} to {arrivalAirport}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row text-gray-900 text-xs sm:text-sm mt-2 sm:mt-4 space-y-2 sm:space-y-0 sm:space-x-4">
                <div className="flex flex-col flex-1">
                  <button
                    className="flex items-center cursor-pointer text-blue-500 font-sans text-sm whitespace-nowrap"
                    onClick={toggleDetails}
                  >
                    Flight Details
                    <FontAwesomeIcon
                      icon={faChevronDown}
                      className="text-blue-500 ml-1"
                    />
                  </button>
                </div>
                <div className="flex flex-col flex-1">
                  <span className="font-sans whitespace-nowrap">{flightDuration}</span>
                </div>
                <div className="flex flex-col flex-1">
                  <span className="font-sans whitespace-nowrap">{flightName}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mini Kartların Sağ Kısımda Düzenlenmesi */}
        <div className="flex flex-wrap gap-2 sm:gap-4 mt-4 ">
          <ClassOptions title="Economy" value="$156" />
          <ClassOptions title="Economy Flexible" value="$256" />
          <ClassOptions title="First" value="$356" />
          {/* İstediğiniz kadar sınıf seçeneği ekleyebilirsiniz */}
        </div>
      </div>
      {/* Detay Kartı */}
      <div
        className={`transition-all duration-800 ${
          isDetailsVisible ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        } overflow-hidden mt-2 mb-2`}
      >
        {isDetailsVisible && (
          <FlightDetailsCard flight={flight} onClose={toggleDetails} />
        )}
      </div>
    </div>
  );
};

// MyFlightsCard bileşeni, uçuş verilerini alır ve FlightCard bileşenlerini render eder
const MyFlightsCard = () => {
  const [flightData, setFlightData] = useState([]);
  const [selectedFlightId, setSelectedFlightId] = useState(null);

  // Uçuş verilerini API'den alır ve durumu günceller
  useEffect(() => {
    const fetchFlightData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5001/server/flights/get-flight/"
        );
        const flights = response.data;

        // API'den gelen uçuşları güncelle ve her bir uçuşun airline bilgisini al
        const updatedFlights = flights.map((flight) => ({
          ...flight,
          airline: getAirlineNameFromIATA(flight.prefixIATA),
          scheduleDateTime: formatTime(flight.scheduleDateTime),
          estimatedLandingTime: formatTime(flight.estimatedLandingTime),
          flightDuration: calculateFlightDuration(flight.scheduleDateTime, flight.estimatedLandingTime),
        }));

        console.log("Updated Flights Data:", updatedFlights);
        setFlightData(updatedFlights);
      } catch (error) {
        console.error("Error fetching flight data:", error);
      }
    };

    fetchFlightData();
  }, []);

  // Detayları göster veya gizle
  const toggleDetails = (flightId) => {
    setSelectedFlightId(selectedFlightId === flightId ? null : flightId);
  };

  // Uçuşu listeden kaldır
  const handleDelete = (flightId) => {
    setFlightData(flightData.filter(flight => flight.id !== flightId));
  };

  return (
    <div>
      {flightData.length === 0 ? (
        <div> <Spin /> </div>
      ) : (
        flightData.map((flight) => (
          <FlightCard
            key={flight.id}
            flight={flight}
            toggleDetails={() => toggleDetails(flight.id)}
            isDetailsVisible={selectedFlightId === flight.id}
            onDelete={handleDelete}
          />
        ))
      )}
    </div>
  );
};

export default MyFlightsCard;
