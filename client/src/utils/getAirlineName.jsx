import airlinesData from '../data/airlines.json';

// IATA koduna göre havayolu adını döndüren fonksiyon
export const getAirlineNameFromIATA = (iataCode) => {
  const airline = airlinesData.find(item => item.IATACode === iataCode);
  return airline ? airline.Airline : 'Unknown Airline';
};
