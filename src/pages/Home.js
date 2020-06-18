import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import { auth } from "../services/firebase";

const HomePage = (props) => {
  const user = auth().currentUser;
  return (
    <>
      <div className="home-container">
        <h1 className="home-title">Welcome to Chat-App</h1>
        <p className="lead">
          A great place to share your thoughts with friends
        </p>
        <div className="home-btns">
          {user ? (
            <>
              Welcome {user.displayName} Join the <Link to="/chat">Chat</Link>
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
