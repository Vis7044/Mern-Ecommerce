import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SummaryApi from '../common';
import { FaStar } from 'react-icons/fa6';
import { FaStarHalf } from 'react-icons/fa';
import displayINRCurrency from '../helpers/displayCurrency';
import CategoryWiseProductDisplay from '../components/CategoryWiseProductDisplay';
import addToCart from '../helpers/addToCart';
import Context from '../context';

const ProductDetails = () => {
  const [product, setProduct] = useState({
    productName: '',
    brandName: '',
    category: '',
    productImage: [],
    description: '',
    price: '',
    sellingPrice: '',
  });
  const [loading, setLoading] = useState(true);
  const productImageListLoading = new Array(product.productImage.length).fill(
    null
  );
  const [imageCord, setImageCord] = useState({
    x: 0,
    y: 0,
  });
  const [zoomImage, setZoomImage] = useState(false);

  const [activeImage, setActiveImage] = useState('');
  const { fetchUserAddToCart} = useContext(Context);

  const params = useParams();
  const navigate = useNavigate()

  const fetcProductDetails = async () => {
    setLoading(true);
    const resp = await fetch(SummaryApi.productDetails.url, {
      method: SummaryApi.productDetails.method,
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        productId: params?.id,
      }),
    });

    const respData = await resp.json();
    setProduct(respData?.data);
    setLoading(false);
    setActiveImage(respData?.data?.productImage[0]);
  };

  const handleMouseEnter = (imageUrl) => {
    setActiveImage(imageUrl);
  };

  const handleZoomImage = useCallback(
    (e) => {
      setZoomImage(true);
      const { left, top, width, height } = e.target.getBoundingClientRect();

      const x = (e.clientX - left) / width;
      const y = (e.clientY - top) / height;
      setImageCord({
        x,
        y,
      });
    },
    [imageCord]
  );

  const handleMouseLeave = () => {
    setZoomImage(false);
  };

  useEffect(() => {
    fetcProductDetails();
  }, [params]);

  const handleAddToCart = async(e,id) => {
    await addToCart(e,id)
    fetchUserAddToCart()
  }

  const handleByProduct = async(e,id) => {
    await addToCart(e,id)
    fetchUserAddToCart()
    navigate('/cart')
  }
  return (
    <div className="container mx-auto p-4">
      <div className="min-h-[200px] flex flex-col lg:flex-row gap-4">
        {/* product image */}
        <div className="lg:h-[500px] h-96 flex flex-col lg:flex-row-reverse gap-4">
          <div className="h-[300px] w-[300px] lg:h-[500px] lg:w-[500px] bg-slate-200 relative p-2">
            <img
              src={activeImage}
              alt="productImage1"
              className="h-full w-full object-scale-down mix-blend-multiply"
              onMouseMove={handleZoomImage}
              onMouseLeave={handleMouseLeave}
            />
            {/* product Zoom */}
            {zoomImage && (
              <div className="hidden lg:block absolute min-w-[550px] min-h-[550px] overflow-hidden bg-slate-200 p-1 -right-[560px] top-0">
                <div
                  className="w-full h-full min-h-[550px] min-w-[550px] mix-blend-multiply scale-125"
                  style={{
                    backgroundImage: `url(${activeImage})`,
                    backgroundRepeat: 'no repeat',
                    backgroundPosition: `${imageCord.x * 100}% ${
                      imageCord.y * 100
                    }%`,
                  }}
                ></div>
              </div>
            )}
          </div>
          <div className="h-full">
            {loading ? (
              <div className="flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full">
                {productImageListLoading.map((el, index) => {
                  return (
                    <div
                      className="h-20 w-20 bg-slate-200 rounded animate-pulse"
                      key={index}
                    ></div>
                  );
                })}
              </div>
            ) : (
              <div className="flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full">
                {product?.productImage?.map((imageUrl, index) => {
                  return (
                    <div
                      className="h-20 w-20 bg-slate-200 rounded p-1"
                      key={index}
                    >
                      <img
                        src={imageUrl}
                        className="w-full h-full object-scale-down mix-blend-multiply cursor-pointer"
                        alt="productImage"
                        onClick={() => handleMouseEnter(imageUrl)}
                        onMouseEnter={() => handleMouseEnter(imageUrl)}
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
        {/* product details */}
        {loading ? (
          <div className="grid gap-1 w-full">
            <p className="bg-slate-200 animate-pulse h-6 lg:h-8 rounded-full inline-block w-full"></p>
            <h2 className="text-2xl lg:text-4xl font-medium h-6 bg-slate-200 animate-pulse w-full  "></h2>
            <p className="capitalize text-slate-400 bg-slate-200 min-w-[100px] animate-pulse h-6 lg:h-8 w-full "></p>
            <div className="text-red-600 flex items-center gap-1 bg-slate-200 animate-pulse h-6 lg:h-8 w-full "></div>
            <div className="flex items-center gap-2 text-xl lg:2xl font-medium my-1 h-6 lg:h-8 animate-pulse w-full ">
              <p className="text-red-600 bg-slate-200 w-full "></p>
              <p className="text-slate-600 line-through bg-slate-200 w-full "></p>
            </div>

            <div className="flex items-center gap-3 my-2 w-full">
              <button className="h-6 bg-slate-200 rounded animate-pulse w-full"></button>
              <button className="h-6 bg-slate-200 rounded animate-pulse w-full"></button>
            </div>
            <div className="w-full">
              <p className="text-slate-600 font-medium my-1 h-6 lg:h-8 bg-slate-200 rounded animate-pulse w-full">
                {' '}
              </p>
              <p className="h-10 lg:h-12 bg-slate-200 rounded animate-pulse w-full"></p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-1">
            <p className="bg-red-200 text-red-600 px-2 rounded-full inline-block w-fit">
              {product.brandName}
            </p>
            <h2 className="text-2xl lg:text-4xl font-medium">
              {product?.productName}
            </h2>
            <p className="capitalize text-slate-400">{product.category}</p>
            <div className="text-red-600 flex items-center gap-1">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStarHalf />
            </div>
            <div className="flex items-center gap-2 text-xl lg:2xl font-medium my-1">
              <p className="text-red-600">
                {displayINRCurrency(product.sellingPrice)}
              </p>
              <p className="text-slate-600 line-through">
                {displayINRCurrency(product.price)}
              </p>
            </div>

            <div className="flex items-center gap-3 my-2">
              <button className="border-2 border-red-500 rounded px-3 py-1 min-w-[120px] text-red-600 font-medium hover:bg-red-600 hover:text-white" onClick={(e)=>handleByProduct(e,product._id)}>
                Buy
              </button>
              <button className="border-2 border-red-500 rounded px-3 py-1 min-w-[120px] text-white font-medium bg-red-600 hover:bg-white hover:text-red-600" onClick={(e)=>handleAddToCart(e,product._id)}>
                Add To Cart
              </button>
            </div>
            <div>
              <p className="text-slate-600 font-medium my-1">description : </p>
              <p>{product?.description}</p>
            </div>
          </div>
        )}
      </div>
      {product.category && (
        <CategoryWiseProductDisplay
          category={product?.category}
          heading={'Recommended Products'}
        />
      )}
    </div>
  );
};

export default ProductDetails;
