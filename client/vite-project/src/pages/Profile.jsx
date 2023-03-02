import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import './Profile.css';
const Profile = () => {
  const [Info, setInfo] = useState([])
    const user = Cookies.get('username')
    const token = Cookies.get('auth-token')
  
    useEffect(() => {
      getUserPost()

  
}, [])


    const getUserPost = async () =>{
   let userData =  await  axios.get(`http://localhost:3000/ProfileInfo${user}`)
   setInfo(userData.data);

    }
const deleteUser = async (id) =>{
  let result = await axios.delete(`http://localhost:3000/${id}`,{
    headers:{
      'auth-token':token
    }
  })
console.log(result);
}
    
  const getTimeSincePost = (createdAt) => {
    const timeDiff = new Date() - new Date(createdAt);
    const seconds = Math.floor(timeDiff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days} day${days > 1 ? 's' : ''} ago`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (minutes > 0) {
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else {
      return 'just now';
    }
  };
  return (
  
  <div>

    <Navbar user={user}/>

    <div className="profile-container">
      <h2 className='username'>{user}</h2>
      {Info.reverse().map((postInfo, index) => {
        const base64String = btoa(
          new Uint8Array(postInfo.file.data.data)
            .reduce((data, byte) => data + String.fromCharCode(byte), '')
        );
        const dataUri = `data:${postInfo.file.contentType};base64,${base64String}`;

        return (
          <div key={index} className='blogposts'>
            <h1 className='author'>{postInfo.author}</h1>
            <hr />
            <p className='date'>Posted {getTimeSincePost(postInfo.CreatedAt)}</p>
            <h1 className='title'>{postInfo.title}</h1>
            <img src={dataUri} alt="" className='pic' width={300}/>
            <p className='description'>{postInfo.description}</p> 
            <img src="https://thumbs.dreamstime.com/b/dustbin-icon-isolated-white-background-your-web-mobile-app-design-dustbin-icon-isolated-white-background-133871859.jpg"  className='dustbin' alt="" width={50} height={30} onClick={() => deleteUser(postInfo._id)}/>
          </div>
        )
      })}

    </div>
  </div>

  );
};

export default Profile;