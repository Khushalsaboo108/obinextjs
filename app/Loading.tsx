import React from 'react';
import Image from 'next/image';
import imagesLoading from './images/Loading_icon.gif';

type LoadingProps = {
  isLoading: boolean;
};

const Loading: React.FC<LoadingProps> = ({ isLoading }) => {
  if (!isLoading) {
    return null;
  }

  return (
    <div className=' fixed z-[99999] bg-slate-500 ' >
      <Image src={imagesLoading} alt="Loading icon" />
    </div>
  );
};

export default Loading;
