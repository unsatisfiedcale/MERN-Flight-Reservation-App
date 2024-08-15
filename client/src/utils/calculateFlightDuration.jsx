const calculateFlightDuration = (departureTime, arrivalTime) => {
    if (!departureTime || !arrivalTime) return 'N/A';
    
    const departureDate = new Date(departureTime);
    const arrivalDate = new Date(arrivalTime);
    
    // Hesapla süreyi milisaniye cinsinden
    const durationMs = departureDate - arrivalDate  ;
    
    if (durationMs < 0) return 'Invalid duration'; // Geçersiz süre durumunu kontrol et
  
    const totalMinutes = Math.floor(durationMs / (1000 * 60));
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
  
    return `${hours}h ${minutes}m`;
  };
  
  export default calculateFlightDuration;
  