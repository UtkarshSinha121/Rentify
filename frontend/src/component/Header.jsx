import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import useUserContext from "../UserContext";

const Header = () => {
  const { loggedIn, logout } = useUserContext();

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <div className="d-flex align-item-center mx-3">
            <h4 className="navbar-brand logo">Rentify</h4>
          </div>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 ">
            <li className="nav-item mx-2 item">
              { loggedIn ? (
                <NavLink className="nav-link  " to="/show">
                  <b>Browse House</b>
                </NavLink>
              ) : ( null )
                }
              </li>
            <li className="nav-item mx-2 item">
              { loggedIn ? (
                <NavLink className="nav-link  " to="/add">
                  <b>Add House</b>
                </NavLink>
              ) : ( null )
                }
              </li>
            <li className="nav-item mx-2 item">
              { loggedIn ? (
                <NavLink className="nav-link  " to="/seller">
                  <b>My House</b>
                </NavLink>
              ) : ( null )
                }
              </li>
              <li className="nav-item mx-2 item ">
                {loggedIn ? ( null ) : (
                <NavLink className="nav-link  " to="/">
                  <b>Home</b>
                </NavLink>
                )
                }
              </li>
              <li className="nav-item mx-2 item ">
                {loggedIn ? (
                  <NavLink className="nav-link  " to="/"  onClick={logout}>
                    <b>Logout</b>
                  </NavLink>
                ) : (
                  <NavLink className="nav-link  " to="/login">
                    <b>Login</b>
                  </NavLink>
                )}
              </li>
              <li className="nav-item mx-2 item ">
                {loggedIn ? ( null ) : (
                <NavLink className="nav-link  " to="/signup">
                  <b>Signup</b>
                </NavLink>
                )
                }
              </li>
              
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
