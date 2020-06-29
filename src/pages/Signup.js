import React, { useState } from "react";
import { Link } from "react-router-dom";
import { signUp, signInWithGoogle, signInWithGitHub } from "../helpers/auth";
import "./LoginSignup.css";
import { createUserProfileDocument } from "../services/firebase";
import { useInput } from "../hooks/useInput";

const SignUp = (props) => {
  const [error, setError] = useState(null);
  const { value: email, bind: bindEmail } = useInput();
  const { value: password, bind: bindPassword } = useInput();
  const { value: displayName, bind: bindDisplayName } = useInput();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { user } = await signUp(email, password);
      createUserProfileDocument(user, { displayName });
    } catch (err) {
      setError(err.message);
    }
  };

  const googleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      setError(error.message);
    }
  };

  const gitHubSignIn = async () => {
    try {
      await signInWithGitHub();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="form-container">
      <div className="login-signup-title">
        <p>Sign up to</p>
        <h1>
          Re<span style={{ fontSize: "50%" }}>ac</span>tro
          <br />
          Chat
        </h1>
      </div>

      <form className="login-signup-form" onSubmit={handleSubmit}>
        <label className="login-signup-label">
          <input
            className="form-input"
            type="text"
            {...bindDisplayName}
            placeholder="Display Name"
          />
        </label>
        <label className="login-signup-label">
          <input
            className="form-input"
            type="email"
            {...bindEmail}
            placeholder="Email"
          />
        </label>
        <label className="login-signup-label">
          <input
            className="form-input"
            type="password"
            {...bindPassword}
            placeholder="Password"
          />
        </label>
        {error ? <p>{error}</p> : null}
        <button className="btn btn-submit" type="submit">
          Sign Up
        </button>
      </form>
      <div className="btn btn-group">
        <p className="upper-p">Or Sign Up with:</p>
        <div className="btn-sub">
          <button
            className="btn btn-google"
            type="submit"
            onClick={googleSignIn}
          >
            Google
          </button>
          <button
            className="btn btn-github"
            type="submit"
            onClick={gitHubSignIn}
          >
            GitHub
          </button>
        </div>
        <p className="lower-p">
          Already have an account?
          <br />
          <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
