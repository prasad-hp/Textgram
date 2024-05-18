import React,{ useState } from 'react'
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import LogIn from './pages/Login'
import PostPage from './pages/PostPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/post" element={<PostPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
