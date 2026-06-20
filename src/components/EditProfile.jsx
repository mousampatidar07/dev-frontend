import React, { useState } from 'react'
import UserCard from './UserCard';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

const EditProfile = ({user}) => {

    
      const [firstName ,setFirstname ]= useState(user.firstName);
      const [lastName,setLastname]=useState(user.lastName);
      const [age,setAge]=useState(user.age || " ");
    const [gender,setGender]=useState(user.gender || "");
     const [about,setAbout]=useState(user.about || "");
     const [photoUrl , setPhotourl]=useState(user.photoUrl);
      const [error,setError]=useState("");
      const [showtoast,setShowtoast] = useState(false);
      const dispatch = useDispatch();

     const saveProfile = async () => {
      setError("");
     try{
          const res = await axios.patch(BASE_URL + "/profile/edit" , 
            {firstName,lastName,photoUrl,age,gender,about}, {withCredentials:true}
          );
           dispatch(addUser(res?.data?.data));
           setShowtoast(true);
           setTimeout(()=>{
            setShowtoast(false);
           },3000);
    }
    catch(err){
            setError(err.response.data);
    }
     }

  return (
    
    <div className='flex justify-center my-10 gap-10'>
      
     <div className='flex justify-center '>
      
    <div className="card bg-base-300 w-96 shadow-sm">
  <div className="card-body">
    <h2 className="card-title justify-center">Edit profile</h2>
   <div>
    <fieldset className="fieldset">
  <legend className="fieldset-legend">First name</legend>
  <input
   type="text"
   value={firstName} 
   onChange={(e)=>setFirstname(e.target.value)}     
  className="input" />

  <legend className="fieldset-legend">Last name</legend>
  <input
   type="text"
   value={lastName} 
   onChange={(e)=>setLastname(e.target.value)}     
  className="input" />


<legend className="fieldset-legend">Photo URL</legend>
  <input
   type="text"
   value={photoUrl} 
   onChange={(e)=>setPhotourl(e.target.value)}     
  className="input" />


  <legend className="fieldset-legend">Age</legend>
  <input
   type="text"
   value={age} 
   onChange={(e)=>setAge(e.target.value)}     
  className="input" />


<legend className="fieldset-legend">gender</legend>
  <input
   type="text"
   value={gender} 
   onChange={(e)=>setGender(e.target.value)}     
  className="input" />

  <legend className="fieldset-legend">About</legend>
  <input
   type="text"
   value={about} 
   onChange={(e)=>setAbout(e.target.value)}     
  className="input" />
  
</fieldset>
   </div>
    <div className="card-actions justify-center">
      <p className='text-red-400'>{error}</p>
      <button className="btn btn-primary" onClick={saveProfile} >save profile</button>
    </div>
  </div>
</div>
</div>
<UserCard  user={{firstName,lastName,photoUrl,age,gender,about}}/>
{showtoast && ( <div className="toast toast-top toast-center">
  
  <div className="alert alert-success">
    <span>Profile saved successfully.</span>
  </div>
</div>)}
</div>
  )
}

export default EditProfile
