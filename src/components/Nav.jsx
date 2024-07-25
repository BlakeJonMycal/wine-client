import { Link, useNavigate } from "react-router-dom"
import "./Nav.css"

export const NavBar = () => {
  const navigate = useNavigate()

  return <ul className="navbar">
    <li className="navbar-item">
      <Link to="/mywines">My Cellar</Link>
    </li>
    <li className="navbar-item">
      <Link to="/allwines">Explore Wines</Link>
    </li>
    <li className="navbar-item">
      <Link to="/addwine">Add A Wine</Link>
    </li>
    <li className="navbar-item">
      <Link to="/profile">My Profile</Link>
    </li>
    {localStorage.getItem("wine_token") ? (
        <li className="navbar-item navbar-logout">
          <button
            className="navbar-link"
            onClick={() => {
              localStorage.removeItem("wine_token");
              navigate("/login", { replace: true, state: { resetForm: true } });
            }}
          >
            Logout
          </button>
        </li>
    ) : (
      ""
    )}
    <img className="logo" src="/images/capstone logo.png" alt="capstone logo" />

  </ul>
}