import React, { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const navigate=useNavigate();
    useEffect(()=>{
        const auth=localStorage.getItem('user');
        if (auth){
          navigate('/')
        }
    })
    const loginHandle=async ()=>{
        console.warn(email,password);
        let result=await fetch("http://localhost:5000/login",{
          method:'post',
          body:JSON.stringify({email,password}),
          headers:{
            'Content-Type':'application/json'
          },
        });
        result=await result.json();
        console.warn(result);
        if(result.auth){
            localStorage.setItem('user',JSON.stringify(result.user));
            localStorage.setItem('token',JSON.stringify(result.auth));
            navigate('/')
        }else{
            alert("Please enter correct details")
        }
    }

  return (
    <div className='login'>
        <h1>Login</h1>
        <input className='inputBox' onChange={(e)=>setEmail(e.target.value)} type='text' placeholder='Enter Email' value={email}/>
        <input className='inputBox' onChange={(e)=>setPassword(e.target.value)} type='password' placeholder='Enter password' value={password}/>
        <button onClick={loginHandle} type='app-button' className='button'>Login</button>
    </div>
  )
}

export default Login