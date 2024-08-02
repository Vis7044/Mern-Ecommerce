import React, { useEffect, useState } from 'react';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import moment from 'moment';
import { MdEdit } from 'react-icons/md';
import ChangeUserRole from '../components/ChangeUserRole';

const AllUsers = () => {
  const [allUsers, setAllUsers] = useState([]);

  const [openUpdateRole, setOpenUpdateRole] = useState(false);
  const [updateUserDetails, setUpdateUserDetails] = useState({
    name: '',
    email: '',
    role: '',
    _id: ""
  });

  const fetchAllUsers = async () => {
    const resp = await fetch(SummaryApi.allUser.url, {
      method: SummaryApi.allUser.method,
      credentials: 'include',
    });

    const data = await resp.json();
    if (data.success) {
      setAllUsers(data.data);
    }
    if (data.error) {
      toast.error(data.message);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);
  return (
    <div className="bg-white pb-4">
      <table className="w-full userTable">
        <thead>
          <tr className='bg-black text-white'>
            <th>Sr.</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Created At</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {allUsers.map((user, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{user?.name}</td>
                <td>{user?.email}</td>
                <td>{user?.role}</td>
                <td>{moment(user?.createdAt).format('ll')}</td>
                <td>
                  <button
                    className="bg-green-100 rounded-full p-2 cursor-pointer hover:bg-green-500 hover:text-white"
                    onClick={() => {
                      setUpdateUserDetails(user)
                      setOpenUpdateRole(true)
                    }}

                  >
                    <MdEdit />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {openUpdateRole && (
        <ChangeUserRole
          onClose={() => setOpenUpdateRole(false)}
          name={updateUserDetails.name}
          email={updateUserDetails.email}
          role={updateUserDetails.role}
          userId={updateUserDetails._id}
          callFunc={fetchAllUsers}
        />
      )}
    </div>
  );
};

export default AllUsers;
