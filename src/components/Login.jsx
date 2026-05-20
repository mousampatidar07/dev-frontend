import React, { useState } from 'react'
import axios from "axios";

import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';


const Login = () => {

  const [email ,setEmail ]= useState("abhishek@gmail.com");
  const [password,setPassword]=useState("Mousam@123");
  const [error,setError]=useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

const handlelogin = async ()=>{
      try{
        const res = await axios.post(BASE_URL + "/login",{
        emailId: email,
        password,
      },{withCredentials:true});
         dispatch(addUser(res.data));
         return navigate("/");
}catch(err){
  setError(err?.response?.data || "something went wrong");
  console.error(err);
}}
  return (
    <div className='flex justify-center my-10'>
    <div className="card bg-base-300 w-96 shadow-sm">
  <div className="card-body">
    <h2 className="card-title justify-center">Login</h2>
   <div>
    <fieldset className="fieldset">
  <legend className="fieldset-legend">Email ID</legend>
  <input
   type="email"
   value={email} 
   onChange={(e)=>setEmail(e.target.value)}     
  className="input" />
  <legend className="fieldset-legend">Password</legend>
  <input 
  type="text" 
  value={password}
  onChange={(e)=>setPassword(e.target.value)}
  className="input" />
  
</fieldset>
   </div>
    <div className="card-actions justify-center">
      <p className='text-red-400'>{error}</p>
      <button className="btn btn-primary" onClick={handlelogin}>Login</button>
    </div>
  </div>
</div>
</div>
  )
}

export default Login;
