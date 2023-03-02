import React from 'react'
import './navbar.css'
import { Link } from 'react-router-dom'
const Navbar = (props) => {
  return (
   <nav>
    <div className='logo'>
      
        <h4><Link to='/Profile'>{props.user} PROFILE</Link></h4>
    </div>
    <h4><Link to='/blog'>Blog</Link></h4>

    <ul>
      
        <li> <Link to='/post'>Create Post</Link></li>
        <li>Logout</li>
    </ul>
   </nav>
  )
}

export default Navbar
