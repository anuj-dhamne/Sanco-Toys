import React, { useEffect, useState } from 'react'
import axios from 'axios';
import ProductUser from '../components/common/ProductUser';

function Products() {
    const [response,setResponse]=useState([]);

    const fetchProducts = async () => {
        try {
            const res = (await axios.get("http://localhost:5000/api/v1/product/get-all-products")).data.data;
            setResponse(res);
            console.log("response : ", res);
        } catch (error) {
            console.log("There is some error in fetching products ", error);
        }
    };

    useEffect(()=>{
     fetchProducts();
    },[])
  return (
   <>
   <h2 className="text-3xl font-bold text-center text-gray-900 mb-10 mt-8">
                   All Products
                </h2>
   {
    response.map((p)=>
        <ProductUser product={p} key={p._id} refreshProducts={fetchProducts}/>
    )
   }
   <p className='text-center '>**Orders placed from Pune City or Pimpri-Chinchwad will be delivered in one day</p>
   </>
  )
}

export default Products