import React from 'react'
import AdminOnlyRoute from '../../components/adminOnlyRoute/AdminOnlyRoute'
import Product from '../../components/product/Product'
import Slider from '../../components/slider/Slider'



const Home = () => {
  return (
    <div>
         {/* <Slider/>  */}
        {/* <h1>Home Page</h1> */}
        {/* <AdminOnlyRoute/> */}
        <Product/>

    </div>
  )
}

export default Home