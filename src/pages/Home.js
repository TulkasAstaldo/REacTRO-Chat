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
        <h1 className="home-title">
          Welcome to Re<span style={{ fontSize: "50%" }}>ac</span>tro Chat
        </h1>
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
                Create New Account
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
