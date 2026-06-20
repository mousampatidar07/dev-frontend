import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addRequests, removeRequest } from '../utils/requestSlice'

const Requests = () => {
    const requests = useSelector((store) => store.requests);
    const dispatch=useDispatch();



    const reviewRequest = async (status , _id) =>{
      try{
        const res = await axios.post(BASE_URL + "/request/review/" + status + "/" + _id , {} , {withCredentials:true});
        dispatch(removeRequest(_id));
      }catch(err){
         console.err
      };
    }

    const fetchRequest = async () =>{
         try{
          const res = await axios.get(BASE_URL + "/user/request/recevied" , 
            {withCredentials:true},);
                 console.log("Requests API response:", res.data);
      console.log("Requests data:", res?.data?.data);
            dispatch(addRequests(res.data.data));
         }catch(err){
                console.log(err)
         }
    }

    useEffect(()=>{
        fetchRequest();
    },[]);
    
  if(!requests) return null;

if(requests.length === 0) return <h1 className='flex justify-center my-10'>No requests Found</h1>;

  return (
    <div className='text-center justify-center my-10 '>
      <h1 className='text-4xl text-bold'>Requests</h1>

         {requests.map((request) => {
        const { _id } = request;

    
        const user = request.fromUserId;

        if (!user) return null;

        const { firstName, lastName, photoUrl, age, gender, about } = user;
          return(
          <div 
          key={_id} 
          className='m-4 p-4 border justify-between items-center rounded-lg bg-base-300 w-1/2 mx-auto'>
            <div><img alt='photo' className='w-20 h-20 rounded-full' src={photoUrl}/></div>
            <div className='text-left  mx-4'>
              <h2 className='font-bold text-xl'>{firstName + lastName}</h2>
              {age && gender && <p>{age + "," + gender}</p>}
              
            <p>{about}</p>
            
            </div>
            <div><button className="btn btn-primary mx-2" onClick={()=>reviewRequest("rejected" , request._id)}>Reject</button>
<button className="btn btn-secondary mx-2" onClick={()=>reviewRequest("accepted" , request._id)}>Accept</button></div>
          </div>
          
        )}
      )
      }
      
    </div>
  )
}

export default Requests
