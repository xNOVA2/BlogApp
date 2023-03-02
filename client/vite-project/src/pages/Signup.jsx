import React, { useState } from 'react';
import './Signup.css';
import { Link } from 'react-router-dom';
import axios from 'axios'
//http://localhost:3000/register
function Signup() {
  const [username, setusername] = useState('');
  const [password, setPassword] = useState('');
const [error, seterror] = useState('')
  const handleSubmit =async (event) => {
    event.preventDefault();
try {
  const res =  await axios.post('http://localhost:3000/register',{
    username:username,
    password:password
  })
  if(res.statusText == 'OK'){
seterror(res.data)
  }
  else if(res.statusText != 'OK'){
    alert("SERVER DOWN TRY LATER")
  }
} catch (error) {
  console.log(error)
}
 
  }

  return (
    <>
    <div className="login-container">
      <form  className="login-form" onSubmit={handleSubmit}>
        <h2>Signup</h2>
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
        <button type="submit">Signup</button>
        <p>Already have a acoount ?</p>
        <Link to='/'>Login Now</Link>
      </form>
     
    </div>
     <p className='error'>{error}</p>
     </>
  );
}

export default Signup;
