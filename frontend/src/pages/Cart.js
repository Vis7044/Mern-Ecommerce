import React, { useContext, useEffect, useState } from 'react';
import SummaryApi from '../common';
import Context from '../context';
import displayINRCurrency from '../helpers/displayCurrency';

import {loadStripe} from '@stripe/stripe-js';

import { AiFillDelete } from 'react-icons/ai';

const Cart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const context = useContext(Context);
  const loadingCart = new Array(context.cartProductCount).fill(null);

  const fetchData = async () => {
    const resp = await fetch(SummaryApi.addToCartProductView.url, {
      method: SummaryApi.addToCartProductView.method,
      credentials: 'include',
    });

    const respData = await resp.json();

    if (respData.success) {
      setData(respData.data);
    }
  };

  const handleLoading = async () => {
    setLoading(true);
    await fetchData();
    setLoading(false);
  };
  useEffect(() => {
    handleLoading();
  }, []);

  const increaseQty = async (id, qty) => {
    const response = await fetch(SummaryApi.updateCartProduct.url, {
      method: SummaryApi.updateCartProduct.method,
      credentials: 'include',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        _id: id,
        quantity: qty + 1,
      }),
    });

    const responseData = await response.json();
    console.log(responseData);
    if (responseData.success) {
      fetchData();
    }
  };
  const decreaseQty = async (id, qty) => {
    if (qty >= 2) {
      const response = await fetch(SummaryApi.updateCartProduct.url, {
        method: SummaryApi.updateCartProduct.method,
        credentials: 'include',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          _id: id,
          quantity: qty - 1,
        }),
      });

      const responseData = await response.json();
      console.log(responseData);
      if (responseData.success) {
        fetchData();
      }
    }
  };

  const handlePayment = async ()=> {
    const stripePromise = await loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
    const resp = await fetch(SummaryApi.payment.url,{
      method: SummaryApi.payment.method,
      credentials: 'include',
      headers: {
        'content-type':'application/json'
      },
      body:JSON.stringify({cartItems:data})
    })

    const respData = await resp.json()
    if(respData?.id) {
      stripePromise.redirectToCheckout({sessionId : respData.id})
    }
  }

  const deleteCartProduct = async (id) => {
    const response = await fetch(SummaryApi.deleteCartProduct.url, {
      method: SummaryApi.deleteCartProduct.method,
      credentials: 'include',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        _id: id,
      }),
    });

    const responseData = await response.json();
    if (responseData.success) {
      fetchData();
      context.fetchUserAddToCart();
    }
  };

  const totalQty = data.reduce((prev, curr) => prev + curr.quantity, 0);
  const totalPrice = data.reduce(
    (prev, curr) => prev + curr?.quantity * curr?.productId?.sellingPrice,
    0
  );
  console.log(data);
  return (
    <div className="container mx-auto">
      <div className="text-center text-lg my-3">
        {data.length === 0 && !loading && (
          <p className="bg-white py-5">No Data</p>
        )}
      </div>
      <div className="flex flex-col lg:flex-row gap-10 lg:justify-between p-4">
        {/* display product */}
        <div className="w-full max-w-3xl min-h-[calc(100vh-245px)]">
          {loading
            ? loadingCart.map((el, index) => {
                return (
                  <div
                    key={index + 'addToCartLoadig'}
                    className="w-full bg-slate-200 h-32 my-2 border border-slate-300 animate-pulse rounded"
                  ></div>
                );
              })
            : data.map((product, index) => {
                return (
                  <div
                    key={index}
                    className="w-full bg-white h-32 my-2 border border-slate-300 rounded grid grid-cols-[128px,1fr]"
                  >
                    <div className="w-28 h-32 bg-slate-200">
                      <img
                        src={product?.productId?.productImage[0]}
                        alt="prodc"
                        className="w-full h-full object-scale-down mix-blend-multiply"
                      />
                    </div>
                    <div className="px-4 py-2 relative">
                      {/* DElete Product */}
                      <div
                        onClick={() => deleteCartProduct(product?._id)}
                        className="absolute right-0 text-red-600 rounded-full p-2 hover:bg-red-600 hover:text-white cursor-pointer"
                      >
                        <AiFillDelete />
                      </div>
                      <h2 className="text-lg lg:text-xl text-ellipsis line-clamp-1">
                        {product?.productId?.productName}
                      </h2>
                      <p className="capitalize text-slate-500">
                        {product?.productId?.category}
                      </p>
                      <div className="flex items-center justify-between">
                        <p className="text-red-600 text-lg font-medium">
                          {displayINRCurrency(product?.productId?.sellingPrice)}
                        </p>
                        <p className="text-slate-600 text-lg font-semibold">
                          {displayINRCurrency(
                            product?.productId?.sellingPrice * product?.quantity
                          )}
                        </p>
                      </div>
                      <div className="flex items-center gap-3 mt-1">
                        <button
                          className=" border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center rounded"
                          onClick={() =>
                            increaseQty(product?._id, product?.quantity)
                          }
                        >
                          +
                        </button>
                        <span>{product.quantity}</span>
                        <button
                          className=" border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center rounded"
                          onClick={() =>
                            decreaseQty(product?._id, product?.quantity)
                          }
                        >
                          -
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
        </div>
        {/* summary */}
        { data[0] && <div className="mt-5 lg:mt-0 w-full max-w-sm">
          {loading ? (
            <div className="h-36 bg-slate-200 border border-slate-300 animate-pulse"></div>
          ) : (
            <div className="h-36 bg-white">
              <h1 className="text-white bg-red-600 px-4 py-1">Summary</h1>
              <div className="flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600">
                <p>Quantity</p>
                <p>{totalQty}</p>
              </div>
              <div className="flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600">
                <p>Total Price</p>
                <p>{displayINRCurrency(totalPrice)}</p>
              </div>
              <button onClick={handlePayment} className="bg-blue-600 p-2 text-white w-full">
                Checkout
              </button>
            </div>
          )}
        </div>}
        
      </div>
    </div>
  );
};

export default Cart;
