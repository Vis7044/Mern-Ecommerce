import React, { useState } from 'react';
import loginIcon from '../assest/signin.gif';
import { FaEye } from 'react-icons/fa';
import { IoMdEyeOff } from 'react-icons/io';
import { Link } from 'react-router-dom';
import imageTobase64 from '../helpers/imageTobase64';
import SummaryApi from '../common';
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify'

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    profilePic: '',
  });
  const navigate= useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleUploadPic = async (e) => {
    const file = e.target.files[0];
    const imagePic = await imageTobase64(file);
    setData((prev)=>{
      return {
        ...prev,
        profilePic: imagePic
      }
    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(data.password === data.confirmPassword) {
      const dataResponse = await fetch(SummaryApi.signup.url,{
        method : SummaryApi.signup.method,
        headers: {
          "content-type" : "application/json"
        },
        body: JSON.stringify(data)
      })
      const dataapi = await dataResponse.json();
      if(dataapi.success) {
        toast.success(dataapi.message)
        navigate('/login')
      } 
      if(dataapi.error) {
        toast.error(dataapi.message)
      }
      
      
    }else {
      toast.error("please check confirm password")
    }
    
    
  };
  return (
    <section id="signup">
      <div className="mx-auto container p-4">
        <div className="bg-white p-5 py-5 w-full max-w-sm mx-auto">
          <div className="w-20 h-20 mx-auto relative overflow-hidden rounded-full">
            <div>
              <img src={data.profilePic || loginIcon} alt="login icons" />
            </div>
            <form>
              <label>
                <div className="text-xs bg-slate-200 bg-opacity-80 cursor-pointer pb-4 pt-2 text-center absolute bottom-0 w-full">
                  Upload Photo
                </div>
                <input type="file" className="hidden" onChange={handleUploadPic}/>
              </label>
            </form>
          </div>
          <form className="pt-6 flex flex-col gap-2" onSubmit={handleSubmit}>
            <div className="grid">
              <label>Name : </label>
              <div className="bg-slate-100 p-2">
                <input
                  name="name"
                  type="text"
                  value={data.name}
                  placeholder="Enter Username"
                  className="w-full h-full outline-none bg-transparent"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="grid">
              <label>Email : </label>
              <div className="bg-slate-100 p-2">
                <input
                  name="email"
                  type="email"
                  value={data.email}
                  placeholder="Enter Email"
                  className="w-full h-full outline-none bg-transparent"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div>
              <label>Password : </label>
              <div className="bg-slate-100 p-2 flex">
                <input
                  name="password"
                  value={data.password}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter Password"
                  className="w-full h-full outline-none bg-transparent"
                  onChange={handleChange}
                  required
                />
                <div
                  className="cursor-pointer text-lg"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <span>{showPassword ? <IoMdEyeOff /> : <FaEye />}</span>
                </div>
              </div>
            </div>
            <div>
              <label>Confirm Password : </label>
              <div className="bg-slate-100 p-2 flex">
                <input
                  name="confirmPassword"
                  value={data.confirmPassword}
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Enter Confirm Password"
                  className="w-full h-full outline-none bg-transparent"
                  onChange={handleChange}
                  required
                />
                <div
                  className="cursor-pointer text-lg"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  <span>
                    {showConfirmPassword ? <IoMdEyeOff /> : <FaEye />}
                  </span>
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="bg-red-600 text-white px-6 py-2 w-full max-w-[150px] mx-auto block mt-6 rounded-xl hover:scale-90 transition-all hover:bg-red-700"
            >
              Signup
            </button>
          </form>
          <p className="my-5">
            Already have an account?{' '}
            <Link
              to={'/login'}
              className="text-red-600 hover:underline hover:text-red-700"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Signup;
