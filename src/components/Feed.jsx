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
    const res =  await axios.get( BASE_URL + "/feed", {withCredentials: true});
   
    dispatch(addFeed(res?.data));
   }

useEffect(()=>{
  getFeed()
},[]);

if(!feed) return;
if(feed.length <= 0) return <h1 className='flex justify-center my-10'>there is no new user found!</h1>;

  return (
   feed && ( <div className='flex justify-center my-10'>
      <UserCard user={feed[0]}/>
    </div>
   )
  )
}

export default Feed
