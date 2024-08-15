import airports from 'airports';

// IATA koduna göre şehir isimlerini döndür
export const getCityNameFromIATA = (iataCode) => {
  const airport = airports.find(a => a.iata === iataCode);
  return airport ? airport.name : 'Unknown';
};
