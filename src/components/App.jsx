import { useState } from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Authorized } from "./Auth"
import { Login } from "../pages/Login.jsx"
import { Register } from '../pages/Register.jsx'
import { UserWines } from "./UserWineList.jsx"
import { AllWines } from "./WineList.jsx"
import { WineDetails } from "./WineDetails.jsx"
import { WineForm } from "./WineForm.jsx"
import { EditWineForm } from "./EditWineForm.jsx"


export const App = () => {

  return (
    <>
    <BrowserRouter>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route element={<Authorized />}>
                <Route path="/mywines" element={<UserWines showAll={false} />} />
                <Route path="/wines/:wineId" element={<WineDetails />} />
                <Route path="/allwines" element={<AllWines showAll={true} />} />
                <Route path="/allwines/:wineId" element={<WineDetails />} />
                <Route path="/addwine" element={<WineForm />} />
                <Route path="/editwine/:wineId" element={<EditWineForm />} />


            </Route>
        </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
