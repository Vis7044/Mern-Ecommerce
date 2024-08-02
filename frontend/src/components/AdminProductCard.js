import React, { useState } from 'react';
import { MdModeEditOutline } from 'react-icons/md';
import AdmitEditProduct from './AdmitEditProduct';
import displayINRCurrency from '../helpers/displayCurrency';

const AdminProductCard = ({ data, fetchData }) => {
  const [editProduct, setEditProduct] = useState(false);
  return (
    <div className="bg-white p-4 rounded ">
      <div className="w-40">
        <div className='w-32 h-32 flex justify-center items-center'><img
          src={data.productImage[0]}
          alt="productImage"
          width={120}
          height={120}
          
          className="mx-auto object-fill h-full"
        /></div>

        <h1 className='text-ellipsis line-clamp-2'>{data.productName}</h1>
        <div>
          <div className='font-semibold'>{
            displayINRCurrency(data.sellingPrice)
            }</div>

          <div className="w-fit ml-auto bg-green-100 hover:bg-green-600 rounded-full p-2 hover:text-white cursor-pointer">
            <MdModeEditOutline onClick={() => setEditProduct(true)} />
          </div>
        </div>
      </div>
      {editProduct && (
        <AdmitEditProduct
          fetchData={fetchData}
          prod={data}
          onClose={() => setEditProduct(false)}
        />
      )}
    </div>
  );
};

export default AdminProductCard;
