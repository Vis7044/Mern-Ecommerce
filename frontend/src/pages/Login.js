import React, { useContext, useState } from 'react';
import loginIcon from '../assest/signin.gif';
import { FaEye } from 'react-icons/fa';
import { IoMdEyeOff } from 'react-icons/io';
import { Link } from 'react-router-dom';
import SummaryApi from '../common';
import {toast} from 'react-toastify'
import { useNavigate } from 'react-router-dom';
import Context from '../context';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password:""
  });

  const {fetchUserDetails, fetchUserAddToCart} = useContext(Context);

  const navigate = useNavigate()
  const handleChange = (e) => {
    const {name, value}=e.target;

    setData((prev)=> {
      return {
        ...prev,
        [name]:value
      }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataResponse =await fetch(SummaryApi.signin.url,{
      method : SummaryApi.signup.method,
      credentials: 'include',
        headers: {
          "content-type" : "application/json"
        },
        body: JSON.stringify(data)
    });
    
    const dataApi =  await dataResponse.json()
    
    if(dataApi.success) {
      toast.success(dataApi.message);
      
      navigate('/')
      fetchUserDetails()
      fetchUserAddToCart()
    }
    if(dataApi.error) {
      toast.error(dataApi.message)
    }
  }
  return (
    <section id="login">
      <div className="mx-auto container p-4">
        <div className="bg-white p-5 py-5 w-full max-w-sm mx-auto">
          <div className="w-20 h-20 mx-auto">
            <img src={loginIcon} alt="login icons" />
          </div>
          <form className="pt-6 flex flex-col gap-2" onSubmit={handleSubmit}>
            <div className="grid">
              <label>Email : </label>
              <div className="bg-slate-100 p-2">
                <input
                  name='email'
                  type="email"
                  value={data.email}
                  placeholder="enter email"
                  className="w-full h-full outline-none bg-transparent"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <label>Password : </label>
              <div className="bg-slate-100 p-2 flex">
                <input
                  name='password'
                  value={data.password}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="enter password"
                  className="w-full h-full outline-none bg-transparent"
                  onChange={handleChange}
                />
                <div className="cursor-pointer text-lg" onClick={()=> setShowPassword(!showPassword)}>
                  <span>{showPassword ? <IoMdEyeOff /> : <FaEye />}</span>
                </div>
              </div>
              <Link  to={'/forgot-password'} className='block w-fit ml-auto hover:underline hover:text-red-500'>Forgot Password</Link>
            </div>
            <button type='submit' className='bg-red-600 text-white px-6 py-2 w-full max-w-[150px] mx-auto block mt-6 rounded-xl hover:scale-90 transition-all hover:bg-red-700'>Login</button>
          </form>
          <p className='my-5'>Don't have an account?  <Link to={'/sign-up'} className='text-red-600 hover:underline hover:text-red-700' >Signup</Link></p>
        </div>
      </div>
    </section>
  );
};

export default Login;
