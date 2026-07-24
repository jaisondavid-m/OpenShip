import React from 'react'
import { Routes, Route } from "react-router-dom"

import Test from './pages/test/Test.jsx'
import Login from "./pages/auth/Login.jsx"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login/>} />
      <Route path='/test' element={<Test/>} />
    </Routes>
  )
}

export default App