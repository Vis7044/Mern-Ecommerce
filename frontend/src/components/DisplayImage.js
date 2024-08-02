import React from 'react';
import { IoMdClose } from 'react-icons/io';
const DisplayImage = ({ imgUrl, onClose }) => {
  return (
    <div className="fixed bottom-0 right-0 left-0 top-0 flex justify-center items-center">
      <div className="bg-white shadow-lg rounded max-w-5xl mx-auto p-4">
        <div
          className="w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer"
          onClick={onClose}
        >
          <IoMdClose />
        </div>
        <div className="flex justify-center p-4 h-[80vh] w-[90vh]">
          <img src={imgUrl} alt="img" className="bg-contain" />
        </div>
      </div>
    </div>
  );
};

export default DisplayImage;
