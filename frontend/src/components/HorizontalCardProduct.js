import React, { useContext, useEffect, useRef, useState } from 'react';
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct';
import displayINRCurrency from '../helpers/displayCurrency';

import { FaAngleLeft } from 'react-icons/fa6';
import { FaAngleRight } from 'react-icons/fa6';
import {Link} from 'react-router-dom'
import addToCart from '../helpers/addToCart';
import Context from '../context';

const HorizontalCardProduct = ({ category, heading }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
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
  };

  return (
    <div className="container mx-auto px-4 my-6 relative">
      <h2 className="text-2xl font-semibold py-4">{heading}</h2>
      <div
        className="flex items-center gap-4 mod:gap-6 overflow-scroll scrollbar-none transition-all"
        ref={scrollElement}
      >
        <button
          className="hidden md:block bg-white shadow-md rounded-full absolute -left-3 text-4xl"
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
        {loading
          ? loadingList.map((product, index) => {
              return (
                <div key={index} className="w-full min-w-[340px] md:min-w-[380px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-sm shadow flex">
                  <div className="bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px] animate-pulse"></div>
                  <div className="p-4 grid w-full gap-2">
                    <h2 className="font-semibold text-base md:text-lg text-ellipsis line-clamp-1 text-black bg-slate-200 animate-pulse rounded-full"></h2>
                    <p className="capitalize text-slate-500 p-1 bg-slate-200 animate-pulse rounded-full"></p>
                    <div className="flex gap-2 w-full">
                      <p className="text-red-600 font-medium p-1 bg-slate-200 w-full animate-pulse rounded-full"></p>
                      <p className="text-slate-500 line-through p-1 bg-slate-200 w-full animate-pulse rounded-full"></p>
                    </div>
                    <button className="rounded-full text-sm text-white px-2 py-0.5 mr-2 w-full bg-slate-200 animate-pulse"></button>
                  </div>
                </div>
              );
            })
          : data.map((product, index) => {
              return (
                <Link key={index} to={'product/'+product?._id} className="w-full min-w-[340px] md:min-w-[380px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-sm shadow flex">
                  <div className="bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px]">
                    <img
                      src={product.productImage[0]}
                      alt="productImage"
                      className="object-scale-down h-full hover:scale-125 transition mix-blend-multiply"
                    />
                  </div>
                  <div className="p-4 grid">
                    <h2 className="font-semibold text-base md:text-lg text-ellipsis line-clamp-1 text-black">
                      {product?.productName}
                    </h2>
                    <p className="capitalize text-slate-500">
                      {product?.category}
                    </p>
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

export default HorizontalCardProduct;
