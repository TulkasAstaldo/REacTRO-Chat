import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import { UserContext } from "../Context";

const HomePage = () => {
  const { user } = useContext(UserContext);
  return (
    <>
      <div className="home-container">
        <div className="home-title">
          <h2>
            Welcome <br />
            to <br />
            Re<span style={{ fontSize: "50%" }}>ac</span>tro Chat!
          </h2>
        </div>
        <p className="lead">
          An 8bit Chat application, for the 80's and 90's video game
          enthusiasts!
        </p>
        <div className="home-btns">
          {user ? (
            <>
              <p className="user-welcome">
                Welcome <br /> <strong>{user.displayName}</strong>!
                <br />
                Join the <br />
                <Link to="/chat">Chat!</Link>
              </p>
            </>
          ) : (
            <>
              <Link className="btn btn-signup" to="/signup">
                New Account
              </Link>
              <span>Or</span>
              <Link className="btn btn-signin" to="/login">
                Log In
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default HomePage;
