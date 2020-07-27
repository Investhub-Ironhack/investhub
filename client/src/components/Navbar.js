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

          <Link className="btn" to="/signup">
            Signup
          </Link>
          <Link className="btn" to="/article">
            Articles
          </Link>
          <Link className="btn" to="/stock">
            Stocks
          </Link>

          <Link className="btn" to="/login">
            Login
          </Link>

          <Link
            className="btn btn-secundary"
            to="/"
            onClick={() => handleLogout(props)}
          >
            Logout
          </Link>
        </div>
      </nav>
    </navbar>
  );
}

export default Navbar;
