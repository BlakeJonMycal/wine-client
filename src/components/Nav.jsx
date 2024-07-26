import { Link, useNavigate } from "react-router-dom"
import "./Nav.css"

export const NavBar = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("wine_token")
    navigate("/login", { replace: true })
  }

  return (
    <ul className="navbar">
      <li className="navbar-item">
        <Link to="/mywines" className="navbar-link">My Cellar</Link>
      </li>
      <li className="navbar-item">
        <Link to="/allwines" className="navbar-link">Explore Wines</Link>
      </li>
      <li className="navbar-item">
        <Link to="/addwine" className="navbar-link">Add A Wine</Link>
      </li>
      <li className="navbar-item">
        <Link to="/profile" className="navbar-link">My Profile</Link>
      </li>
      {localStorage.getItem("wine_token") ? (
        <li className="navbar-item navbar-logout">
          <span
            className="navbar-link"
            onClick={handleLogout}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleLogout()
              }
            }}
          >
            Logout
          </span>
        </li>
      ) : null}
      <img className="logo" src="/images/capstone logo.png" alt="capstone logo" />
    </ul>
  )
}

