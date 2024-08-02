import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import SummaryApi from '../common'
import VerticalCard from '../components/VerticalCard'

const SearchProduct = () => {
    const query = useLocation()
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)

    const fetchProduct =async () => {
      setLoading(true)
      const resp = await fetch(SummaryApi.searchProduct.url+query.search,{
        method: SummaryApi.searchProduct.method
      })
      const respData = await resp.json();
      setLoading(false)
      setData(respData.data)
    }

    useEffect(()=> {
      fetchProduct()
    },[query])
  return (
    <div className='container mx-auto p-4'>
      {
        loading && <p className='text-lg text-center'>loading ....</p>
      }
      <p className='text-lg font-semibold my-3'>Search Results : {data.length} </p>
      {
        data.length ===0 && !loading && (
          <p className='bg-white p-4 text-lg text-center'>No Product Found...</p>
        )
      }
      {
        data.length !==0 && !loading && (
         
              <VerticalCard laoding={loading} data={data}/>
           
        )
      }
    </div>
  )
}

export default SearchProduct
