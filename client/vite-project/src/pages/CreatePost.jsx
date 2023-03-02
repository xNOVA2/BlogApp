import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import './CreatePost.css';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);

  const navigate = useNavigate()
  const token  = Cookies.get('auth-token')
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);
    formData.append('description', description);
  
    try {
      const response = await axios.post(
        'http://localhost:3000/upload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'auth-token': token,
          },
        }
      );
      console.log(response);

      if(response.statusText == 'OK'){
        navigate('/blog')
      }
    } catch (error) {
      console.error(error);
    }
  };
  

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  return (
    <>
      <Navbar />
      <form className="post-form" onSubmit={handleSubmit}>
        <label className="post-form__label" htmlFor="title">
          Title
        </label>
        <input
          className="post-form__input"
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={handleTitleChange}
          required
        />

        <label className="post-form__label" htmlFor="description">
          Description
        </label>
        <textarea
          className="post-form__input"
          id="description"
          name="description"
          value={description}
          onChange={handleDescriptionChange}
          required
        ></textarea>

        <label className="post-form__label" htmlFor="file">
          Select a file
        </label>
        <input
          className="post-form__file-input"
          type="file"
          id="file"
          name="file"
          accept="image/*"
          onChange={handleFileChange}
          required
        />

        <button className="post-form__button" type="submit">
          Submit
        </button>
      </form>
    </>
  );
};

export default CreatePost;
