import { Navigate, Outlet } from "react-router-dom"
import { NavBar } from "./Nav.jsx"

export const Authorized = () => {
  if (localStorage.getItem("wine_token")) {
    return <>
      <NavBar />
      <main className="p-4">
        <Outlet />
      </main>
    </>
  }
  return <Navigate to='/login' replace />
}