import React, { useState } from "react";
import { Link } from "react-router-dom";
import { signIn, signInWithGoogle, signInWithGitHub } from "../helpers/auth";
import "./LoginSignup.css";
import { useInput } from "../hooks/useInput";

const Login = (props) => {
  const [error, setError] = useState(null);
  const { value: email, bind: bindEmail } = useInput("");
  const { value: password, bind: bindPassword } = useInput("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signIn(email, password);
    } catch (error) {
      setError(error.message);
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
        <p>Log in to</p>
        <h1>
          Re<span style={{ fontSize: "50%" }}>ac</span>tro
          <br />
          Chat
        </h1>
      </div>

      <form
        className="login-signup-form"
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <label className="login-signup-label" for="email">
          <input
            type="email"
            className="form-input"
            {...bindEmail}
            placeholder="Email"
          />
        </label>
        <label className="login-signup-label">
          <input
            type="password"
            className="form-input"
            {...bindPassword}
            placeholder="Password"
          />
        </label>

        {error ? <p>{error}</p> : null}
        <button className="btn btn-submit" type="submit">
          Log In
        </button>
      </form>
      <div className="btn-group">
        <p className="upper-p">Or Log in with:</p>
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
          Don't have an account?
          <br />
          <Link className="link" to="/signup">
            Sign up!
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
