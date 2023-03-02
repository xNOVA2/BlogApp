import Navbar from "./components/Navbar"
import Login from "./pages/Login"
import {BrowserRouter as Router ,Route , Routes}from 'react-router-dom'
import Signup from "./pages/Signup"
import Blog from "./pages/Blog"
import CreatePost from "./pages/CreatePost"
import Profile from "./pages/Profile"
function App() {

  return (
    <Router>
   <Routes>
    <Route path="/" element={<Login/>}/>
    <Route path="/blog" element={<Blog/>} />
    <Route path="/signup" element={<Signup/>}/>
    <Route path="/post" element={<CreatePost/>}/>
    <Route path="/profile" element={<Profile/>}/>
   </Routes>
    </Router>
 
  )
}

export default App
