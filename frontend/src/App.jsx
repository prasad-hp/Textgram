import React,{ useState } from 'react'
import {BrowserRouter, Route, Routes} from "react-router-dom"
import LandingPage from './pages/LandingPage'
import SignUp from './pages/SignUp'
import LogIn from './pages/Login'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<LandingPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
