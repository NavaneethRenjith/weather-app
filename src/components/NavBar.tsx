import { Link } from "react-router-dom";

//TODO: Handle actual isLogged in state
export default function NavBar() {
  const isLoggedIn: Boolean = true;

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <span className="navbar-brand mb-0 h1">Weather App</span>
        {isLoggedIn ? (
          <div>
            <Link to="/logout">
              <button className="btn btn-dark">Logout</button>
            </Link>
          </div>
        ) : (
          <div className="d-flex gap-2">
            <Link to="/login">
              <button className="btn btn-dark">Login</button>
            </Link>
            <Link to="/signup">
              <button className="btn btn-link signup-btn">Sign Up</button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
