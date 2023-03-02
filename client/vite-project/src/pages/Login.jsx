import React, { useState } from 'react';
import './login.css';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios'
import Cookies from 'js-cookie';


function Login() {
  const navi = useNavigate()
  const [username, setusername] = useState('');
  const [password, setPassword] = useState('');
const [error, seterror] = useState('')

async function handleSubmit(event) {
  event.preventDefault();
  try {
    const response = await axios.post('http://localhost:3000/login', {
      username: username,
      password: password
    }, {
      withCredentials: true
    });
    const authToken = Cookies.get('auth-token');
    Cookies.set('auth-token',authToken);
   const userinfo = Cookies.get('username')
   Cookies.set('userinfo',userinfo)

    if(response.statusText == 'OK'){
      navi('/blog')
    }
     
    
  } catch (error) {
    seterror(error.response);
  }
}


  return (
    <>
    <div className="login-container">
        
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="Email">Username:</label>
          <input 
            type="text" 
            id="email" 
            placeholder="Enter your username" 
            value={username} 
            onChange={(event) => setusername(event.target.value)} 
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input 
            type="password" 
            id="password" 
            placeholder="Enter your password" 
            value={password} 
            onChange={(event) => setPassword(event.target.value)} 
            required 
          />
        </div>
        <button type="submit">Login</button>
        <p></p>
        <Link to='./signup'> Create Account</Link>
      </form>

    </div>
    <p className='errorr'>{error}</p>

    </>
  );
}

export default Login;
