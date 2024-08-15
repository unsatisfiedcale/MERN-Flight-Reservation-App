import React from 'react';
import { Link } from 'react-router-dom';
import Flightlogo from '../../../assets/flightlogo.png'; 
import DealsLogo from '../../../assets/deals.svg'; 
import DiscoverLogo from '../../../assets/discover.svg'; 
import AvatarPhoto from '../../../assets/Avatar.png'; 
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';


const Header = () => {
  return (
    <div className="bg-gray-100"> {/* Arka plan rengini gri yapıyoruz */}
      <header className="py-4 px-6 flex items-center justify-between">
        {/* Sol Taraf */}
        <div className="flex items-center ">
          <Link to="/" className="flex items-center">
            <img src={Flightlogo} alt="Flight Logo" className="w-12 md:w-15" />
            <span className="text-xl md:text-xl font-bold ml-3">PLANE SCAPE</span>
          </Link>
        </div>
        {/* Sağ Taraf */}
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center">
            <img src={DealsLogo} alt="Deals Logo" className="w-4 md:w-4" />
            <span className="text-xs md:text-sm font-light ml-2">Deals</span>
          </Link>
          <Link to="/" className="flex items-center">
            <img src={DiscoverLogo} alt="Discover Logo" className="w-4 md:w-4" />
            <span className="text-xs md:text-sm font-light ml-2">Discover</span>
          </Link>
          <Stack direction="row" spacing={2}>
          <Link to="/" className="flex items-center">
            <Avatar src={AvatarPhoto} alt="Joane Smith" className="w-4 md:w-4"/>
            <span className="text-xs md:text-sm font-light ml-2">Joane Smith</span>
          </Link>
          </Stack>
        </div>
      </header>
    </div>
  );
};

export default Header;
