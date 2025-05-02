import { Link, useNavigate, useLocation } from "react-router-dom";
import { getToken, logout } from "../../auth";
import { useEffect, useState } from "react";
import "./Navbar.css"; // Import the CSS

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLogging, setIsLogging] = useState(false);

  const checkLoginStatus = () => {
    const token = getToken();
    setIsLogging(token && token.length > 0);
  };

  useEffect(() => {
    checkLoginStatus();
  }, [location.pathname]);

  const logoutFunc = () => {
    logout();
    setIsLogging(false);
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="nav-links">
        {!isLogging ? (
          <>
            <Link to="/register" className="nav-link">Register</Link>
            <Link to="/login" className="nav-link">Login</Link>
          </>
        ) : (
          <>
            <Link to="/events" className="nav-link">Events</Link>
            <Link to="/my-bookings" className="nav-link">My Bookings</Link>
            <button onClick={logoutFunc} className="logout-btn">Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
