import React, { useState } from 'react'
import axios from "axios";

import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';


const Login = () => {

  const [email ,setEmail ]= useState("");
  const [password,setPassword]=useState("");
  const [error,setError]=useState("");
  const [firstname,setFirstname]=useState("");
  const [lastname,setLastname]=useState("");
  const [isLoginForm,setIsLoginForm]=useState(true);
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

const handlesignup = async () => {
  try{
     const res = await axios.post(BASE_URL + "/signup" , {firstName:firstname,lastName:lastname,emailId:email ,password},{withCredentials:true});
       dispatch(addUser(res.data.data));
       return navigate("/profile");
  }
  catch(err){
           setError(err?.response?.data || "something went wrong");
  }
}
  return (
    <div className='flex justify-center my-10'>
    <div className="card bg-base-300 w-96 shadow-sm">
  <div className="card-body">
    <h2 className="card-title justify-center">{isLoginForm ? "Login" : "Signup"}</h2>
   <div>
    <fieldset className="fieldset">
        {!isLoginForm && (<>
        <legend className="fieldset-legend">First Name </legend>
  <input
   type="text"
   value={firstname} 
   onChange={(e)=>setFirstname(e.target.value)}     
  className="input" />

    <legend className="fieldset-legend">Last Name</legend>
  <input
   type="text"
   value={lastname} 
   onChange={(e)=>setLastname(e.target.value)}     
  className="input" />
  </>)}

  <legend className="fieldset-legend">Email ID</legend>
  <input
   type="email"
   value={email} 
   onChange={(e)=>setEmail(e.target.value)}     
  className="input" />
  <legend className="fieldset-legend">Password</legend>
  <input 
  type="password" 
  value={password}
  onChange={(e)=>setPassword(e.target.value)}
  className="input" />
  
</fieldset>
   </div>
    <div className="card-actions justify-center">
      <p className='text-red-400'>{error}</p>
      <button className="btn btn-primary" onClick={isLoginForm ? handlelogin : handlesignup}>{isLoginForm? "Login" : "Signup"}</button>
    </div>
    <p className='m-auto cursor-pointer'  onClick={()=>setIsLoginForm((value)=> !value)}>{isLoginForm? "new user Signin Here" : "existing user Login Here"}</p>
  </div>
</div>
</div>
  )
}

export default Login;
