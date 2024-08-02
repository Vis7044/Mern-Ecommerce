import React, { useEffect, useState } from 'react'
import UploadProduct from '../components/UploadProduct'
import SummaryApi from '../common'
import AdminProductCard from '../components/AdminProductCard'

const AllProducts = () => {
  const [openUploadProduct, setOpenUploadProduct] = useState(false)
  const [allProduct, setAllProduct] = useState([])

  const fetchAllProduct = async () => {
    const resp = await fetch(SummaryApi.allProduct.url);

    const allData = await resp.json()

    setAllProduct(allData?.data || [])
  }

  useEffect(()=> {
    fetchAllProduct()
  },[])
  return (
    <div>
      <div className='bg-white py-2 px-4 flex justify-between items-center'>
        <h2 className='font-bold text-lg'>All Products</h2>
        <button onClick={()=>setOpenUploadProduct(true)} className=' border-red-600 border-2 text-red-600 hover:bg-red-600 hover:text-white transition-all  py-1 px-3 rounded-full'>Upload Product</button> 
      </div>

      <div className='flex items-center flex-wrap gap-5 py-4 h-[calc(100vh-190px)] overflow-y-scroll'>
        {
          allProduct.map((product,index)=> {
            return (
              <AdminProductCard fetchData={fetchAllProduct} data={product} key={index+"allProduct"}/>
              
            )
          })
        }
      </div>
      {/* Upload Product components */}
      {openUploadProduct && <UploadProduct onClose={()=> setOpenUploadProduct(false)} fetchData={fetchAllProduct}/>}
    </div>
  )
}

export default AllProducts
