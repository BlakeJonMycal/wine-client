import { Link, useNavigate } from "react-router-dom"
import "./Nav.css"

export const NavBar = () => {
  const navigate = useNavigate()

  return <ul className="navbar">
    <li className="navbar-item">
      <Link to="/mylibrary">My Library</Link>
    </li>
    <li className="navbar-item">
      <Link to="/addphilosopher">Add Philosopher</Link>
    </li>
    <li className="navbar-item">
      <Link to="/myprofile">My Profile</Link>
    </li>
    {localStorage.getItem("wine_token") ? (
      <li className="navbar-item navbar-logout">
        <Link
          className="navbar-link"
          to=""
          onClick={() => {
            localStorage.removeItem("wine_token")
            navigate("/", { replace: true })
          }}
        >
          Logout
        </Link>
      </li>
    ) : (
      ""
    )}
    <img className="logo" src="/images/capstone logo.png" alt="capstone logo" />

  </ul>
}