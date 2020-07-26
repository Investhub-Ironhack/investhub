import React from "react";
import { Link } from "react-router-dom";
import { logout } from "../services/auth";
import investhubLogo from "../images/investhub-logo.png";

const handleLogout = (props) => {
  logout().then(() => {
    props.setUser(null);
  });
};

function Navbar(props) {
  return (
    <navbar>
      <nav class="navbar">
        <div class="container">
          <img
            className="navbar-logo"
            src={investhubLogo}
            alt="Investhub's Logo"
          />

          <div class="menu">
            <Link className="btn btn-secundary" to="/">
              Home
            </Link>

            <Link
              className="btn btn-secundary"
              to="/"
              onClick={() => handleLogout(props)}
            >
              Logout
            </Link>
          </div>

          <div class="menu">
            <a class="btn" href="/auth/login">
              Login
            </a>
            <a class="btn btn-secundary" href="/auth/signup">
              Sign Up
            </a>
          </div>
        </div>
      </nav>
      <Link to="/">Home</Link>
      <Link to="/login">Login</Link>
      <Link to="/signup">Signup</Link>
      <Link to="/article">Articles</Link>
      <Link to="/stock">Stocks</Link>
      <Link to="/" onClick={() => handleLogout(props)}>
        Logout
      </Link>
    </navbar>
  );
}

export default Navbar;
