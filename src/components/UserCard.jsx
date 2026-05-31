import React from 'react'

const UserCard = ({user}) => {
    const {firstName,lastName,photoUrl,age,about,gender } = user;
    console.log("users",user);
      return (
    <div className="card bg-base-300 w-96 shadow-2xl">
  <figure>
    <img
      src={photoUrl}
      alt="photo" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{firstName + " " + lastName }</h2>
    {age && gender && <p>{age + " " + gender }</p>}
    <p>{about}</p>
    <div className="card-actions justify-center my-4">
         <button className="btn btn-primary">ignore</button>
      <button className="btn btn-secondary">Intrested</button>
    </div> 
  </div>
</div>
  )
}

export default UserCard
