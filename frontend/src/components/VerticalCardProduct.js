import React, { useContext, useEffect, useRef, useState } from 'react';
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct';
import displayINRCurrency from '../helpers/displayCurrency';

import { FaAngleLeft } from 'react-icons/fa6';
import { FaAngleRight } from 'react-icons/fa6';
import addToCart from '../helpers/addToCart';
import { Link } from 'react-router-dom';
import Context from '../context';

const VerticalCardProduct = ({ category, heading }) => {
  const [data, setData] = useState([]);
  const [laoding, setLoading] = useState(false);
  const loadingList = new Array(13).fill(null);

  const [scroll, setScroll] = useState(0);
  const scrollElement = useRef();

  const { fetchUserAddToCart} = useContext(Context);

  const handleAddToCart = async (e,id) => {
    await addToCart(e,id)
    await fetchUserAddToCart()
  }

  const fetchData = async () => {
    setLoading(true);
    const categoryProduct = await fetchCategoryWiseProduct(category);
    setLoading(false);
    setData(categoryProduct.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const scrollToRight = () => {
    scrollElement.current.scrollLeft += 600;
  };

  const scrolTolLeft = () => {
    scrollElement.current.scrollLeft -= 600;
  }

  return (
    <div className="container mx-auto px-4 my-6 relative">
      <h2 className="text-2xl font-semibold py-4">{heading}</h2>
      <div
        className="flex items-center gap-4 md:gap-6 overflow-x-scroll scrollbar-none transition-all"
        ref={scrollElement}
      >
        <button className="hidden md:block bg-white shadow-md rounded-full absolute -left-3 text-4xl"
        onClick={scrolTolLeft}
        >
          <FaAngleLeft />
        </button>
        <button
          onClick={scrollToRight}
          className="hidden md:block bg-white shadow-md rounded-full absolute -right-3 text-4xl"
        >
          <FaAngleRight />
        </button>
        {
            laoding? (loadingList.map((product, index) => {
                return (
                  <div key={index} className="w-full min-w-[340px] md:min-w-[380px] max-w-[280px] md:max-w-[320px] bg-white rounded-sm shadow">
                    <div className="bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center animate-pulse">
                      
                    </div>
                    <div className="p-4 grid gap-2">
                      <h2 className="font-semibold text-base md:text-lg text-ellipsis line-clamp-1 text-black p-1 py-2 animate-pulse rounded-full bg-slate-200">
                        
                      </h2>
                      <p className="capitalize text-slate-500 p-1 animate-pulse rounded-full bg-slate-200 py-2"></p>
                      <div className="flex gap-2 w-full">
                        <p className="text-red-600 font-medium p-1 animate-pulse rounded-full bg-slate-200 py-2 w-full">
                          
                        </p>
                        <p className="text-slate-500 line-through p-1 animate-pulse rounded-full bg-slate-200 py-2 w-full">
                          
                        </p>
                      </div>
                      <button className="text-sm   text-white px-2 py-0.5 mr-2 p-1 animate-pulse rounded-full py-2 bg-slate-200">
                        
                      </button>
                    </div>
                  </div>
                );
              })):
        data.map((product, index) => {
          return (
            <Link to={'product/'+product._id} key={index} className="w-full min-w-[340px] md:min-w-[380px] max-w-[280px] md:max-w-[320px] bg-white rounded-sm shadow">
              <div className="bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center">
                <img
                  src={product.productImage[0]}
                  alt="productImage"
                  className="object-scale-down h-full hover:scale-110 transition mix-blend-multiply"
                />
              </div>
              <div className="p-4 grid gap-2">
                <h2 className="font-semibold text-base md:text-lg text-ellipsis line-clamp-1 text-black">
                  {product?.productName}
                </h2>
                <p className="capitalize text-slate-500">{product?.category}</p>
                <div className="flex gap-2">
                  <p className="text-red-600 font-medium">
                    {displayINRCurrency(product?.sellingPrice)}
                  </p>
                  <p className="text-slate-500 line-through">
                    {displayINRCurrency(product?.price)}
                  </p>
                </div>
                <button onClick={(e) => handleAddToCart(e,product._id)} className="text-sm bg-red-600 hover:bg-red-700 text-white px-2 py-0.5 rounded-md mr-2">
                  Add to Cart
                </button>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default VerticalCardProduct;
