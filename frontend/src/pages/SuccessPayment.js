import React from 'react'
import SUCCESSIMAGE from '../assest/success.gif'
import {Link} from 'react-router-dom'

const SuccessPayment = () => {
  return (
    <div className='bg-slate-200 rounded max-w-md w-full mx-auto flex justify-center items-center flex-col p-4 m-3'>
      <img src={SUCCESSIMAGE} alt='succes'  width={150} height={150}/>
      <p className='text-green-600 font-bold text-xl'>Payment Successfull</p>
      <Link to={'/order'} className='p-2 mt-5 my-2 border-2 border-green-600 rounded font-semibold text-green-600 hover:bg-green-600 hover:text-white'>See Orders</Link>
    </div>
  )
}

export default SuccessPayment
