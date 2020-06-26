import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import { auth } from "../services/firebase";
import { UserContext } from "../Context";

const HomePage = () => {
  const { user } = useContext(UserContext);
  return (
    <>
      <div className="home-container">
        <div className="home-title">
          <p>Welcome to</p>
          <h1>
            Re<span style={{ fontSize: "50%" }}>ac</span>tro
            <br />
            Chat!
          </h1>
        </div>
        <p className="lead">
          A great place to share your thoughts with friends
        </p>
        <div className="home-btns">
          {user ? (
            <>
              <p className="user-welcome">
                Welcome <br /> {user.displayName}{" "}
              </p>
              Join the <Link to="/chat">Chat</Link>
            </>
          ) : (
            <>
              <Link className="btn btn-signup" to="/signup">
                New Account
              </Link>
              <span>Or</span>
              <Link className="btn btn-signin" to="/login">
                Sign In
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default HomePage;
