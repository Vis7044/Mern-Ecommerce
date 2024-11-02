import React, { useContext, useState } from 'react';
import logo from '../assest/logo2.png';
import { GrSearch } from 'react-icons/gr';
import { LuUserCircle2 } from 'react-icons/lu';
import { FaCartShopping } from 'react-icons/fa6';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import { setUserDetails } from '../store/userSlice';
import ROLE from '../common/role';
import Context from '../context';

const Header = () => {
  const user = useSelector((state) => state?.user?.user);
  const dispatch = useDispatch();

  const [menu, setMenu] = useState(false);
  const context = useContext(Context);
  const navigate = useNavigate();
  const searchInput = useLocation();
  const URLSearch = new URLSearchParams(searchInput?.search);
  const searchQuery = URLSearch.getAll('q');
  const [search, setSearch] = useState(searchQuery);

  const handleLogout = async () => {
    const resp = await fetch(SummaryApi.logout_user.url, {
      method: SummaryApi.logout_user.method,
      credentials: 'include',
    });

    const data = await resp.json();
    if (data.success) {
      toast.success(data.message);
      dispatch(setUserDetails(null));
      navigate('/');
    }
    if (data.error) {
      toast.success(data.message);
    }
  };

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearch(value);
    if (value) {
      navigate(`/search?q=${value}`);
    } else {
      navigate('/search');
    }
  };

  return (
    <header className="h-16 shadow-md bg-white fixed w-full z-50">
      <div className="h-full container mx-auto flex items-center px-4 justify-between">
        <div className="">
          <Link to={'/'}>
            <img src={logo} alt="logo" className="h-8" />
          </Link>
        </div>
        <div className="hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow pl-2">
          <input
            type="text"
            placeholder="search product here"
            className="w-full outline-none"
            onChange={handleSearch}
            value={search}
          />
          <div className="flex text-lg text-white items-center bg-red-600 h-8 min-w-[50px] justify-center rounded-r-full">
            <GrSearch />
          </div>
        </div>
        <div className="flex items-center gap-7">
          <div className="relative flex justify-center">
            {user && (
              <div
                onClick={() => setMenu(!menu)}
                className="text-3xl cursor-pointer"
              >
                {user?.profilePic ? (
                  <img
                    src={user?.profilePic}
                    alt={user?.name}
                    className="w-10 h-10 rounded-full"
                  />
                ) : (
                  <LuUserCircle2 />
                )}
              </div>
            )}
            {menu && (
              <div className="absolute bg-white hidden md:block bottom-0 top-11 h-fit p-2 shadow-lg rounded">
                <nav className='flex flex-col'>
                  {user?.role === ROLE.ADMIN && (
                    <Link
                      to={'/admin-panel/all-products'}
                      className="whitespace-nowrap  hover:bg-slate-100 p-2"
                      onClick={() => setMenu(!menu)}
                    >
                      Admin Panel
                    </Link>
                  )}

                  <Link to={'/order'} onClick={()=>setMenu(!menu)} className="whitespace-nowrap  hover:bg-slate-100 p-2">Order</Link>
                </nav>
              </div>
            )}
          </div>
          {user?._id && (
            <Link to={'/cart'} className="text-2xl cursor-pointer relative">
              <span>
                <FaCartShopping />
              </span>

              <div className="bg-red-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 left-3">
                <p className="text-sm">{context.cartProductCount}</p>
              </div>
            </Link>
          )}

          <div>
            {user?._id ? (
              <button
                onClick={handleLogout}
                className="px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700"
              >
                Logout
              </button>
            ) : (
              <Link
                to={'/login'}
                className="px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
