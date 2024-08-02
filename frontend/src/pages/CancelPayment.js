import React from 'react'
import CANCELIMAGE from '../assest/cancel.jpeg'
import { Link } from 'react-router-dom'

const CancelPayment = () => {
  return (
    <div className='bg-slate-200 rounded max-w-md w-full mx-auto flex justify-center items-center flex-col p-4 m-3'>
      <img className='mix-blend-multiply' src={CANCELIMAGE} alt='succes'  width={150} height={150}/>
      <p className='text-red-600 font-bold text-xl'>Payment Canceled</p>
      <Link to={'/cart'} className='p-2 mt-5 my-2 border-2 border-red-600 rounded font-semibold text-red-600 hover:bg-red-600 hover:text-white'>Go To Cart</Link>
    </div>
  )
}

export default CancelPayment
