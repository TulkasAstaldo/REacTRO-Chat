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

  console.log(error);

  return (
    <div className="form-container">
      <h1>
        Log In to <br />{" "}
        <Link to="/">
          Re<span style={{ fontSize: "50%" }}>ac</span>tro Chat
        </Link>
      </h1>
      <p>Fill in the form below to login to your account.</p>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <label>
          <input type="email" {...bindEmail} placeholder="Email" />
        </label>
        <label>
          <input type="password" {...bindPassword} placeholder="Password" />
        </label>

        {error ? <p>{error}</p> : null}
        <button className="btn login-btn" type="submit">
          Log In
        </button>
      </form>
      <div className="btn-group">
        <p>Or you can log in with: </p>
        <button className="btn btn-google" type="submit" onClick={googleSignIn}>
          Google
        </button>
        <button className="btn btn-github" type="submit" onClick={gitHubSignIn}>
          GitHub
        </button>
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
