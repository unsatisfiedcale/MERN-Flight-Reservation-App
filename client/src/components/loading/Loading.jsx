import React from 'react';
import loadingGif from '../../assets/Loading.gif'

const Loading = () => {
  return (
    <div className="fixed inset-0 bg-white bg-opacity-60 flex items-center justify-center z-50">
      <img src={loadingGif} alt="Loading..." className="w-42 h-36" />
    </div>
  );
};

export default Loading;
