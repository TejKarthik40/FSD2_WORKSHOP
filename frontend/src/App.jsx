import './App.css'
import {Routes,Route} from 'react-router-dom'
import Register from './Register.jsx'
import Login from './Login.jsx'
import Home from './Home.jsx'
import About from './About.jsx'
import Header from './Header.jsx'
import { useState } from 'react'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
    <Routes>
      <Route path="/" element = {<Home/>} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/about" element={<About />} />
    </Routes>
    </>
  )
}

export default App
