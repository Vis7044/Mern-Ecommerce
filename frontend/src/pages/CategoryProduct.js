import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import productCategory from '../helpers/productCategory';
import VerticalCard from '../components/VerticalCard';
import SummaryApi from '../common';

const CategoryProduct = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [filterCategoryList, setFilterCategoryList] = useState([]);
  const location = useLocation();
  const urlSearch = new URLSearchParams(location.search);
  const urlCategoryList = urlSearch.getAll('category');

  const urlCategoryListObject = {};
  urlCategoryList.forEach((el) => {
    urlCategoryListObject[el] = true;
  });

  const [selectCategory, SetSelectCategory] = useState(urlCategoryListObject);
  const [sortBy, setSortBy] = useState('')

  const fetchData = async () => {
    const resp = await fetch(SummaryApi.filterProduct.url, {
      method: SummaryApi.filterProduct.method,
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        category: filterCategoryList,
      }),
    });
    const dataResponse = await resp.json();
    setData(dataResponse?.data || []);
  };

  const handleSelectCategory = (e) => {
    const { value, checked } = e.target;
    SetSelectCategory((prev) => {
      return {
        ...prev,
        [value]: checked,
      };
    });
  };

  useEffect(() => {
    fetchData();
  }, [filterCategoryList]);
  useEffect(() => {
    const arrayOfCategory = Object.keys(selectCategory)
      .map((category) => {
        if (selectCategory[category]) {
          return category;
        }
        return null;
      })
      .filter((el) => el);
    setFilterCategoryList(arrayOfCategory);

    //format of url according to change in checkbox
    const urlFormat = arrayOfCategory.map((el, index) => {
      if (arrayOfCategory.length - 1 === index) {
        return `category=${el}`;
      }

      return `category=${el}&&`;
    });
    navigate('/product-category?' + urlFormat.join(''));
  }, [selectCategory]);


  const handleOnChangeSortBy = (e) => {
    const {value} = e.target;
    setSortBy(value)
    if(value === 'asc') {
      setData(prev => prev.sort((a,b)=>a.sellingPrice - b.sellingPrice))
    }
    if(value === 'desc') {
      setData(prev => prev.sort((a,b)=>b.sellingPrice - a.sellingPrice))
    }
    
  }
  useEffect(()=> {
    
  },[sortBy])
  
  return (
    <div className="container mx-auto p-4">
      {/* Desktop version */}
      <div className="hidden lg:grid grid-cols-[200px,1fr] overflow-y-scroll">
        {/* left side */}
        <div className="bg-white p-2 min-h-[calc(100vh-120px)]">
          {/* sort by */}
          <div className="">
            <h3 className="text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300">
              Sort by :
            </h3>
            <form className="text-sm flex flex-col gap-2 py-2">
              <div className="flex items-center gap-3">
                <input type="radio" name="sortBy" checked={sortBy==='asc'} value={'asc'} onChange={handleOnChangeSortBy}/>
                <label>Price - Low to High</label>
              </div>
              <div className="flex items-center gap-3">
                <input type="radio" name="sortBy" checked={sortBy==='desc'} value={'desc'} onChange={handleOnChangeSortBy}/>
                <label>Price - High to Low</label>
              </div>
            </form>
          </div>

          {/* filter by */}
          <div className="">
            <h3 className="text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300">
              Category :
            </h3>
            <form className="text-sm flex flex-col gap-2 py-2">
              {productCategory.map((category, index) => {
                return (
                  <div className="flex items-center gap-3" key={index}>
                    <input
                      type="checkbox"
                      name={'category'}
                      checked={selectCategory[category?.value]}
                      id={category?.value}
                      onChange={handleSelectCategory}
                      value={category?.value}
                    />
                    <label htmlFor={category?.value}>{category?.label}</label>
                  </div>
                );
              })}
            </form>
          </div>
        </div>
        {/* right side (product)*/}

        <div className='px-4'>
          {data.length===0 && <p>No Product</p>}
          <p className='font-medium text-slate-800 my-1 text-lg'> Search Results : {data.length}</p>
          <div className='h-[calc(100vh-120px)] overflow-y-scroll max-h-[calc(100vh-120px)] scrollbar-none'>
          {data.length !== 0 &&  (
            <VerticalCard data={data} laoding={loading} />
          )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryProduct;
