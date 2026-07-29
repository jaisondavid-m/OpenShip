import React, { useEffect, useState } from 'react'
import { Routes, Route, Navigate } from "react-router-dom"
import { useDispatch } from "react-redux"

import { fetchMe } from "./store/authSlice.js"

import PublicRoute from "./components/routes/PublicRoute.jsx"
import ProtectedRoute from "./components/routes/ProtectedRoute.jsx"


import Login from "./pages/auth/Login.jsx"
import Register from "./pages/auth/Register.jsx"
import Home from "./pages/basics/Home.jsx"
import ForgotPassword from "./pages/auth/ForgotPassword.jsx"
import Profile from "./pages/basics/Profile.jsx"
import Test from './pages/test/Test.jsx'


function App() {

  const dispatch = useDispatch()
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    dispatch(fetchMe()).finally(() => setChecked(true))
  }, [dispatch])

  if (!checked) {
    return (
      <div className='flex min-h-screen items-center justify-center bg-os-bg text-sm text-os-muted' >
        Checking session...
      </div>
    )
  }

  return (
    <Routes>

      <Route element={<PublicRoute />} >
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path='/forgot-password' element={<ForgotPassword/>} />
      </Route>

      <Route element={<ProtectedRoute/>} >
        <Route path='/home' element={<Home/>} />
        <Route path='/profile' element={<Profile/>} />
      </Route>

      <Route path='/test' element={<Test />} />

      <Route path='/' element={<Navigate to="/home" replace />} />
      
    </Routes>
  )
}

export default App