/* TODO - add your code to create a functional React component that renders a navigation bar for the different views in your single page application. You may consider conditionally rendering some options - for example 'Login' should be available if someone has not logged in yet. */

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Navigations({ token, setToken }) {
  console.log(token);
  function handleLogout() {
    localStorage.removeItem("token");
    setToken(null);
  }

  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/books">Books</Link>
        </li>
        {token && <Link to="/account">Account</Link>}
        {!token && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}

        {token && <button onClick={handleLogout}>Logout</button>}
      </ul>
    </nav>
  );
}

export default Navigations;
