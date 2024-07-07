import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const UpdateProduct = () => {
    const [name,setName]=useState("");
    const [price,setPrice]=useState("");
    const [category,setCategory]=useState("");
    const [company,setCompany]=useState("");
    const params=useParams();
    const navigate=useNavigate();
    useEffect(()=>{
        getProductDetails();
    },[])
    const getProductDetails=async()=>{
        console.warn(params)
        let result=await fetch(`http://localhost:5000/product/${params.id}`,{
            headers:{
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result=await result.json();
        setName(result.name)
        setPrice(result.price)
        setCategory(result.category)
        setCompany(result.company)
    }
    
    const updateProduct=async()=>{
        console.warn(name,price,category,company);
        let result=await fetch(`http://localhost:5000/product/${params.id}`,{
            method:'Put',
            body:JSON.stringify({name,price,category,company}),
            headers:{
              'Content-Type':'application/json',
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            },
          });
          result=await result.json()
          navigate('/')
    }
  return (
    <div className='product'>
        <h1>UpdateProduct</h1>
        <input type='text' onChange={(e)=>{setName(e.target.value)}} value={name} className='inputBox' placeholder='Enter product name'/>
        <input type='text' onChange={(e)=>{setPrice(e.target.value)}} value={price} className='inputBox' placeholder='Enter product price'/>    
        <input type='text' onChange={(e)=>{setCategory(e.target.value)}} value={category} className='inputBox' placeholder='Enter product category'/>
        <input type='text' onChange={(e)=>{setCompany(e.target.value)}} value={company} className='inputBox' placeholder='Enter product company'/>
        <button className='appButton' onClick={updateProduct} >Update Product</button>
        </div>
  )
}

export default UpdateProduct