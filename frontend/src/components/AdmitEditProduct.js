import React, { useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import productCategory from '../helpers/productCategory';
import { IoCloudUploadOutline } from 'react-icons/io5';
import uploadImages from '../helpers/uploadImages';
import DisplayImage from './DisplayImage';
import { MdDelete } from 'react-icons/md';
import SummaryApi from '../common';
import {toast} from 'react-toastify'

const AdmitEditProduct = ({
  onClose,
  prod,
  fetchData
}) => {
  const [data, setData] = useState({
    ...prod,
    productName: prod?.productName,
    brandName: prod?.brandName,
    category: prod?.category,
    productImage: prod?.productImage || [],
    description: prod?.description,
    price: prod?.price,
    sellingPrice: prod?.sellingPrice,
  });

  const [fullScreenImage, setFullScreenImage] = useState('');
  const [openFullScreenImage, setOpenFullScreenImage] = useState(false);

  const handleUploadProduct = async (e) => {
    const file = e.target.files[0];

    const uploadImageCloudinary = await uploadImages(file);
    setData((prev) => {
      return {
        ...prev,
        productImage: [...prev.productImage, uploadImageCloudinary.url],
      };
    });
  };

  const handleDeleteProductImage = async (index) => {
    const newProductImage = [...data.productImage];
    newProductImage.splice(index, 1);
    setData((prev) => {
      return {
        ...prev,
        productImage: [...newProductImage],
      };
    });
  };

  const handleOnChange = (e) => {
    const {name, value} = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };


  const handleSubmit = async (e)=> {
    e.preventDefault()
    const resp = await fetch(SummaryApi.updateProduct.url,{
      method: SummaryApi.updateProduct.method,
      credentials: 'include',
      headers: {
        "content-type" : "application/json"
      },
      body: JSON.stringify(data)
    })
    const respdata= await resp.json()
    console.log(respdata)
    if(respdata.success) {
      toast.success(respdata?.message)
      onClose()
      fetchData()
    }
    if(respdata.error) {
      toast.error(respdata?.message)
    }
  }
  return (
    <div className="fixed bg-slate-200 bg-opacity-60 w-full h-full top-0 left-0 bottom-0 right-0 flex justify-center items-center">
    <div className="bg-white p-4 rounded w-full max-w-2xl h-full max-h-[70%] overflow-hidden">
      <div className="flex justify-between items-center pb-3">
        <h2 className="font-bold text-lg">Edit Product</h2>
        <div
          className="w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer"
          onClick={onClose}
        >
          <IoMdClose />
        </div>
      </div>
      <form className="grid p-4 gap-2 overflow-y-scroll h-full pb-5" onSubmit={handleSubmit}>
        <label htmlFor="productName">Product Name :</label>
        <input
          type="text"
          id="productName"
          name="productName"
          placeholder="Enter Product Name"
          value={data.productName}
          onChange={handleOnChange}
          className="p-2 bg-slate-100 border rounded "
          required
        />
        <label htmlFor="brandName" className="mt-3">
          Brand Name :
        </label>
        <input
          type="text"
          id="brandName"
          placeholder="Enter Brand Name"
          value={data.brandName}
          name="brandName"
          onChange={handleOnChange}
          className="p-2 bg-slate-100 border rounded"
          required
        />

        <label htmlFor="category" className="mt-3">
          Category :
        </label>
        <select
          value={data.category}
          className="p-2 bg-slate-100 border rounded"
          onChange={handleOnChange}
          name='category'
          required
        >
          <option value={""} >
                Select Category
              </option>
          {productCategory.map((el, ind) => {
            return (
              <option value={el.value} key={el.value + ind}>
                {el.label}
              </option>
            );
          })}
        </select>

        <label htmlFor="productImage" className="mt-3">
          Product Image :
        </label>
        <label htmlFor="uploadImageInput">
          <div className="p-2 bg-slate-100 border cursor-pointer rounded h-32 w-full flex justify-center items-center">
            <div className="text-slate-500 flex justify-center items-center flex-col gap-2">
              <span className="text-4xl">
                <IoCloudUploadOutline />
              </span>
              <p className="text-sm">Upload Product Image</p>
              <input
                type="file"
                id="uploadImageInput"
                className="hidden"
                onChange={handleUploadProduct}
              />
            </div>
          </div>
        </label>
        <div>
          {data?.productImage[0] ? (
            <div className="flex items-center gap-2">
              {data.productImage.map((el, index) => {
                return (
                  <div className="relative group" key={index}>
                    <img
                      src={el}
                      width={80}
                      
                      alt={el}
                      height={80}
                      className="bg-slate-100 border cursor-pointer"
                      onClick={() => {
                        setOpenFullScreenImage(true);
                        setFullScreenImage(el);
                      }}
                    />
                    <div
                      className="absolute top-0 p-1 text-white bg-red-600 rounded-full cursor-pointer right-0 hidden group-hover:block"
                      onClick={() => handleDeleteProductImage(index)}
                    >
                      <MdDelete />
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-red-600 text-xs">
              *Please Upload Product Image
            </p>
          )}
        </div>

        <label htmlFor="price" className="mt-3">
          Price :
        </label>
        <input
          type="number"
          id="price"
          placeholder="Enter Price"
          value={data.price}
          name="price"
          onChange={handleOnChange}
          className="p-2 bg-slate-100 border rounded"
          required
        />
        <label htmlFor="sellingPrice" className="mt-3">
          Selling Price :
        </label>
        <input
          type="number"
          id="sellingPrice"
          placeholder="Enter Selling Price"
          value={data.sellingPrice}
          name="sellingPrice"
          onChange={handleOnChange}
          className="p-2 bg-slate-100 border rounded"
          required
        />

        <label htmlFor="description" className="mt-3">
          description :
        </label>
        <textarea className='h-20 bg-slate-100 border resize-none p-1' rows={"3"} placeholder='Enter Product Description' name='description' id='description' value={data.description} onChange={handleOnChange}>
        </textarea>



        <button className="px-3 py-2 mb-10 hover:bg-red-800 bg-red-600 text-white ">
          Update Product
        </button>





      </form>



    </div>



    {/**display image full screen**/}
    {openFullScreenImage && (
      <DisplayImage
        onClose={() => setOpenFullScreenImage(false)}
        imgUrl={fullScreenImage}
      />
    )}



  </div>
  )
}

export default AdmitEditProduct
