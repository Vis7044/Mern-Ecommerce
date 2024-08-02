import React, { useEffect, useState } from 'react';
import image1 from '../assest/banner/img1.webp';
import image2 from '../assest/banner/img2.webp';
import image3 from '../assest/banner/img3.jpg';
import image4 from '../assest/banner/img4.jpg';
import image5 from '../assest/banner/img5.webp';

import image1Mobile from '../assest/banner/img1_mobile.jpg';
import image2Mobile from '../assest/banner/img2_mobile.webp';
import image3Mobile from '../assest/banner/img3_mobile.jpg';
import image4Mobile from '../assest/banner/img4_mobile.jpg';
import image5Mobile from '../assest/banner/img5_mobile.png';

import { FaAngleLeft } from 'react-icons/fa6';
import { FaAngleRight } from 'react-icons/fa6';

const BannerProduct = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const desktopImages = [image1, image2, image3, image4, image5];
  const mobileImages = [
    image1Mobile,
    image2Mobile,
    image3Mobile,
    image4Mobile,
    image5Mobile,
  ];

  const nextImage = ()=> {
    if(currentImage!==desktopImages.length-1) {
        setCurrentImage(prev => (prev+1))
    }
  }
  const prevImage = ()=> {
    if(currentImage!==0){
        setCurrentImage(prev => prev-1);
    }
  }

  useEffect(()=> {
    const interval = setInterval(()=> {
        if(currentImage!==desktopImages.length-1) {
            nextImage()
        }else {
            setCurrentImage(0)
        }
    },5000)

    return ()=> clearInterval(interval)
  },[currentImage])
  return (
    <div className="container mx-auto px-4">
      <div className="md:h-72 h-56 w-full bg-slate-200 rounded relative">
        <div className='absolute z-10 w-full h-full md:flex items-center hidden '>
          <div className='flex justify-between w-full text-4xl p-1'>
          <button onClick={prevImage} className='bg-white shadow-md rounded-full'>
            <FaAngleLeft/>
          </button>
          <button onClick={nextImage} className='bg-white shadow-md rounded-full'>
            <FaAngleRight />
          </button>
          </div>
        </div>

        {/* Desktop and tablet version */}
        <div className="hidden md:flex h-full w-full overflow-hidden">
          {desktopImages.map((imageUrl, index) => {
            return (
              <div
                className="w-full h-full min-w-full min-h-full transition-all"
                key={index}
                style={{ transform: `translateX(-${currentImage * 100}%)` }}
              >
                <img
                  src={imageUrl}
                  alt="bannerImage"
                  className="w-full h-full"
                />
              </div>
            );
          })}
        </div>
        {/* Mobile version */}
        <div className="flex h-full w-full overflow-hidden md:hidden">
          {mobileImages.map((imageUrl, index) => {
            return (
              <div
                className="w-full h-full min-w-full min-h-full transition-all"
                key={index}
                style={{ transform: `translateX(-${currentImage * 100}%)` }}
              >
                <img
                  src={imageUrl}
                  alt="bannerImage"
                  className="w-full h-full object-cover"
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BannerProduct;
