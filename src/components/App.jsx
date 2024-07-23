import { useState } from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Authorized } from "./Auth"
import { Login } from "../pages/Login.jsx"
import { Register } from '../pages/Register.jsx'


export const App = () => {

  return (
    <>
    <BrowserRouter>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route element={<Authorized />}>
                
            </Route>
        </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
