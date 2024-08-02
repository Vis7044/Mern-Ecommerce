import React from 'react'
import CategoryList from '../components/CategoryList'
import BannerProduct from '../components/BannerProduct'
import HorizontalCardProduct from '../components/HorizontalCardProduct'
import VerticalCardProduct from '../components/VerticalCardProduct'

const Home = () => {
  return (
    <div>
      <CategoryList/>
      <BannerProduct/>
      <HorizontalCardProduct category={"airpodes"} heading={"Top Airpods"}/>
      <HorizontalCardProduct category={"earphones"} heading={"Popular Watches's"}/>
      <VerticalCardProduct category={"mobiles"} heading={"Top Mobile's"}/>
      <VerticalCardProduct category={"watches"} heading={"Top Watche's"}/>
      <VerticalCardProduct category={"television"} heading={"Top Televison's"}/>
      <VerticalCardProduct category={"camera"} heading={"Top Camera's"}/>
      <VerticalCardProduct category={"refrigerators"} heading={"Top Refrigerator's"}/>
      <VerticalCardProduct category={"mouses"} heading={"Top Mouse's"}/>
      <VerticalCardProduct category={"printers"} heading={"Top Printer's"}/>
    </div>
  )
}

export default Home
