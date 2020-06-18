import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { auth } from "../services/firebase";
import useDropDown from "../hooks/useDropDown";
import "./Header.css";

function Header() {
  const user = auth().currentUser;
  const [active, setActive] = useState(false);
  const ref = useRef(null);

  useDropDown(ref, () => setActive(false));

  const toggleMenu = () => {
    setActive(!active);
  };

  return (
    <>
      <header>
        <nav className="navbar">
          <Link className="navbar-brand" to={"/"}>
            Chat-App
          </Link>
          {auth().currentUser ? (
            <>
              <div className="profile" ref={ref}>
                <div className="nav-pic" onClick={toggleMenu}>
                  <img src={`${user.photoURL}`} alt="user" />
                </div>
                <ul
                  className={
                    active ? "dropdown-content-active" : "dropdown-content"
                  }
                  onClick={toggleMenu}
                >
                  <li>
                    <Link to="/profile">Profile</Link>
                  </li>
                  <li>
                    <div className="sign-out" onClick={() => auth().signOut()}>
                      Log Out
                    </div>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <>
              <Link className="nav-item nav-link mr-3" to="/login">
                Sign In
              </Link>
              <Link className="nav-item nav-link mr-3" to="/signup">
                Sign Up
              </Link>
            </>
          )}
        </nav>
      </header>
    </>
  );
}

export default Header;
