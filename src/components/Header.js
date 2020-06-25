import React, { useState, useRef, useContext } from "react";
import { Link } from "react-router-dom";
import { auth } from "../services/firebase";
import useDropDown from "../hooks/useDropDown";
import { UserContext } from "../Context";
import { ThemeContext } from "../ThemeContext";
import "./Header.css";

const Header = () => {
  const { user } = useContext(UserContext);
  const { handleClick } = useContext(ThemeContext);
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
          <ul className="nav-ul">
            <li className="nav-li">
              <Link className="navbar-brand" to={"/"}>
                Re<span style={{ fontSize: "50%" }}>ac</span>tro Chat
              </Link>
            </li>

            {user ? (
              <>
                <li className="nav-li">
                  <button onClick={handleClick}>Change Theme</button>
                </li>
                <li className="profile">
                  <div className="pic-container" ref={ref} onClick={toggleMenu}>
                    <img
                      className="nav-pic"
                      referrerPolicy="no-referrer"
                      src={`${user.photoUrl}`}
                      alt={user.displayName ? user.displayName : "menu"}
                    />
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
                        <div
                          className="sign-out"
                          onClick={() => auth().signOut()}
                        >
                          Log Out
                        </div>
                      </li>
                    </ul>
                  </div>
                </li>
              </>
            ) : (
              <>
                <li className="nav-li">
                  <Link className="nav-item nav-link" to="/login">
                    Sign In
                  </Link>
                </li>
                <li className="nav-li">
                  <Link className="nav-item nav-link" to="/signup">
                    Sign Up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Header;
