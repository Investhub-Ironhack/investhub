import React from "react";
import { Link } from "react-router-dom";
import { logout } from "../services/auth";

const handleLogout = (props) => {
  logout().then(() => {
    props.setUser(null);
  });
};

function Navbar(props) {
  return (
    <navbar>
      <Link to="/" onClick={() => handleLogout(props)}>
        Logout
      </Link>
    </navbar>
  );
}

export default Navbar;
