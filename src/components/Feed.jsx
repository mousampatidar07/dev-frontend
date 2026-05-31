import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
// import { addUser } from '../utils/userSlice';
import axios from 'axios';
import UserCard from './UserCard';
import { addFeed } from '../utils/feedSlice';


const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
   const getFeed = async ()=>{
       if  (feed) return ; 
    const res =  await axios.get(BASE_URL + "/feed",{withCredentials: true});
    console.log("feed data" , res)
    dispatch(addFeed(res?.data));
   }

useEffect(()=>{
  getFeed()
},[]);

  return (
   feed && ( <div className='flex justify-center my-10'>
      <UserCard user={feed[0]}/>
    </div>
   )
  )
}

export default Feed
