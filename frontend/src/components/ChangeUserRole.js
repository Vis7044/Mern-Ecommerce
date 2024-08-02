import React, { useState } from 'react';
import ROLE from '../common/role';
import { IoMdClose } from 'react-icons/io';
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const ChangeUserRole = ({userId,name,email,role,onClose,callFunc}) => {
  const [userRole, setUserRole] = useState(role);

  const updateUserRole = async () => {
    const resp = await fetch("http://localhost:8080/api/update-user",{
      method: "post",
      credentials: 'include',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        userId: userId,
        role: userRole
      })


    })

    const data = await resp.json();
    if(data.success) {
      toast.success(data.message);
      onClose()
      callFunc()
    }
    console.log("Role",data)
  }
  return (
    <div className="fixed top-0 left-0 bottom-0 right-0 w-full bg-slate-200 bg-opacity-60 h-full z-10 flex justify-between items-center">
      <div className=" mx-auto bg-white shadow-md w-full max-w-sm p-4">
        <button className='block ml-auto' onClick={onClose}>
          <IoMdClose />
        </button>
        <h1 className="pb-4 text-lg font-medium">Change User Role</h1>
        <p>Name: {name}</p>
        <p>Email: {email}</p>

        <div className="flex items-center justify-between my-4">
          <p>Role</p>
          <select className="border px-4 py-1" value={userRole} onChange={(e)=> setUserRole(e.target.value)}>
            {Object.values(ROLE).map((el) => {
              return (
                <option value={el} key={el}>
                  {el}
                </option>
              );
            })}
          </select>
        </div>
        <button onClick={updateUserRole} className="w-fit mx-auto block bg-red-500 text-white hover:bg-red-700 py-1 px-3 rounded-full">
          Change Role
        </button>
      </div>
    </div>
  );
};

export default ChangeUserRole;
