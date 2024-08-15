import Carr from '../../assets/Car.png'; 
import Hotel from '../../assets/Hotel.png'; 
import Travel from '../../assets/Travel.png'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCarRear, faHotel, faUmbrellaBeach } from '@fortawesome/free-solid-svg-icons'; 

// CustomCard bileşeni
const CustomCard = ({ src, alt, icon, iconText }) => {
  return (
    <div className="relative overflow-hidden rounded-lg max-w-[90px] max-h-[200px]  md:max-w-[250px] md:max-h-[200px] "> {/* Kart genişliğini burada ayarlıyoruz */}
      <img src={src} alt={alt} className="w-full h-full object-cover" />
      {icon && (
        <div className="absolute bottom-0 left-0 p-2 text-white flex flex-col items-start bg-opacity-0">
          <FontAwesomeIcon icon={icon} bounce className="text-xl " />
          <span className=" w-auto">{iconText}</span>
        </div>
      )}
    </div>
  );
};

// InfoCards bileşeni
const InfoCards = () => {
  return (
    <div className="flex flex-row md:flex-col gap-8 bg-gray-100">
      <CustomCard 
        src={Carr} 
        alt="Amazing Destination" 
        icon={faCarRear}
        iconText="CAR RENTALS"
      />
      <CustomCard 
        src={Hotel} 
        icon={faHotel}
        alt="Adventure Awaits" 
        iconText="HOTELS"
      />
      <CustomCard 
        src={Travel} 
        icon={faUmbrellaBeach}
        alt="Relax and Unwind" 
        iconText="TRAVEL PACKAGES"
      />
    </div>
  );
};

export default InfoCards;