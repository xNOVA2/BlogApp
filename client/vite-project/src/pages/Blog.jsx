import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import mypic from '../assets/react.svg'

import './blog.css'
import Cookies from 'js-cookie'
import axios from 'axios'

const Blog = () => {

  const [posts, setPosts] = useState([]);

  const user = Cookies.get('username')
  useEffect(() => {
    fetchAllPosts();
  }, []);

  const fetchAllPosts = async () => {
    try {
      const response = await axios.get('http://localhost:3000/getAllPost');
      setPosts(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  
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
    <>
      <Navbar user={user} />
      {posts.slice(0).reverse().map((postInfo, index) => {
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
          </div>
        )
      })}
    </>
  );
};

export default Blog;
