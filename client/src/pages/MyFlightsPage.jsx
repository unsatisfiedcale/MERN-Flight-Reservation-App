import React from 'react';
import Header from '../components/header/my-flights/Header';
import SortBy from '../components/common/SortBy';
import AvgFare from '../components/common/AvgFare';
import MyFlightsCard from '../components/cards/MyFlightsCard';

const MyFlightsPage = () => {

  return (
<div className="min-h-screen">
      <Header />
      <div className="flex justify-between p-4 mt-5 ">
        <SortBy />
        <AvgFare />
      </div>
      <div className="container mx-auto p-4">
        <div className="flex justify-center mt-10">
          <MyFlightsCard />
        </div>
      </div>
    </div>
    
  );
};

export default MyFlightsPage;
