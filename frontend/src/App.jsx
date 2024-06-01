import React,{ useState } from 'react'
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import LogIn from './pages/Login'
import PostPage from './pages/PostPage'
import Profile from './pages/Profile'
import { RecoilRoot } from 'recoil'
import Settings from './pages/Settings'

function App() {
  return (
    <BrowserRouter>
    <RecoilRoot>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/post" element={<PostPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </RecoilRoot>
    </BrowserRouter>
  )
}

export default App
