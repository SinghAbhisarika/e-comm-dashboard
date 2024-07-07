import React, { useState } from 'react'

const AddProduct = () => {
    const [name,setName]=useState("");
    const [price,setPrice]=useState("");
    const [category,setCategory]=useState("");
    const [company,setCompany]=useState("");
    const [error,setError]=useState(false);

    
    const addProduct=async()=>{
        console.warn(name,price,category,company);
        if(!name || !price || !category || !company){
            setError(true)
            return false;
        }
        const userId=JSON.parse(localStorage.getItem('user'))._id;
        let result=await fetch("http://localhost:5000/add-product",{
            method:'post',
            body:JSON.stringify({name,price,category,company,userId}),
            headers:{
              'Content-Type':'application/json',
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            },
          });
          result=await result.json()
    }
  return (
    <div className='product'>
        <h1>AddProduct</h1>
        <input type='text' onChange={(e)=>{setName(e.target.value)}} value={name} className='inputBox' placeholder='Enter product name'/>
        {error && !name && <span className='invalid-input'>Enter valid name</span>}
        <input type='text' onChange={(e)=>{setPrice(e.target.value)}} value={price} className='inputBox' placeholder='Enter product price'/>
        {error && !price && <span className='invalid-input'>Enter valid price</span>}
        <input type='text' onChange={(e)=>{setCategory(e.target.value)}} value={category} className='inputBox' placeholder='Enter product category'/>
        {error && !category && <span className='invalid-input'>Enter valid category</span>}
        <input type='text' onChange={(e)=>{setCompany(e.target.value)}} value={company} className='inputBox' placeholder='Enter product company'/>
        {error && !company && <span className='invalid-input'>Enter valid company</span>}
        <button className='appButton' onClick={addProduct} >Add Product</button>
        </div>
  )
}

export default AddProduct