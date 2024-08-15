export const formatTime = (dateString) => {
  if (!dateString) return '';

  const date = new Date(dateString);

  date.setHours(date.getHours() - 1);

  let hours = date.getHours();
  const minutes = date.getMinutes();
  const isPM = hours >= 12;

  // 12 saatlik formata dönüştür
  hours = hours % 12;
  hours = hours ? hours : 12; // Saat 0 ise 12 olarak ayarla

  // Dakikayı iki basamaklı formatta göster
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  // AM veya PM göstergesi
  const period = isPM ? 'PM' : 'AM';

  return `${hours}:${formattedMinutes} ${period}`;
};
