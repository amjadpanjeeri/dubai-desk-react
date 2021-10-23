/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Link, Redirect } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
export default function NavBar(props) {
  const logout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        alert("You have been logged out!");
        window.location.href = "/login";
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  return (
    <div>
      <nav className="main-header navbar navbar-expand navbar-white navbar-light">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a
              className="nav-link"
              data-widget="pushmenu"
              href="#"
              role="button"
            >
              <i className="fas fa-bars"></i>
            </a>
          </li>
          <li className="nav-item d-none d-sm-inline-block">
            <a href="/" className="nav-link">
              Home
            </a>
          </li>
        </ul>

        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <a
              className="nav-link"
              data-widget="fullscreen"
              href="#"
              role="button"
            >
              <i className="fas fa-expand-arrows-alt"></i>
            </a>
          </li>
          <li className="nav-item">
            {props.currentUser && (
              <a className="nav-link" role="button" onClick={logout}>
                Logout
              </a>
            )}
          </li>
        </ul>
        {/* {`${props.currentUser ? props.currentUser?.email : ""}`} */}
      </nav>
    </div>

    // <div>
    //   <ul>
    //     <li>
    //       <Link to="/">Dash</Link>
    //     </li>
    //     <li>
    //       <Link to="/login">Login</Link>
    //     </li>
    //     <li>
    //       <Link to="/users">Users</Link>
    //     </li>

    //   </ul>

    // </div>
  );
}
