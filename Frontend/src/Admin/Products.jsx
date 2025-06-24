import React, { useEffect, useState } from 'react'
import ProductDisplay from './components/ProductDisplay'
import axios from 'axios';

function Products() {
    const [response,setResponse]=useState([]);

    const fetchProducts = async () => {
        try {
            const res = (await axios.get(`${import.meta.env.VITE_SERVER}/product/get-all-products`)).data.data;
            setResponse(res);
        } catch (error) {
            toast.error("Failed to fetching proucts ! ");
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
        <ProductDisplay product={p} key={p._id} refreshProducts={fetchProducts}/>
    )
   }
   </>
  )
}

export default Products