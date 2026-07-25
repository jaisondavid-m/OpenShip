import React from 'react'
import { Routes, Route } from "react-router-dom"

import Test from './pages/test/Test.jsx'
import Login from "./pages/auth/Login.jsx"
import Register from "./pages/auth/Register.jsx"

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>} />
      <Route path='/test' element={<Test/>} />
    </Routes>
  )
}

export default App