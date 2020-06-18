import React, { useState } from "react";
import { Link } from "react-router-dom";
import { signUp, signInWithGoogle, signInWithGitHub } from "../helpers/auth";
import "./LoginSignup.css";

const SignUp = (props) => {
  const [error, setError] = useState(null);
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    name === "email" && setEmail(value);
    name === "password" && setPassword(value);
    name === "display-name" && setDisplayName(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError({ error: "" });
    try {
      await signUp(displayName, email, password);
    } catch (error) {
      setError({ error: error.message });
    }
  };

  const googleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      setError({ error: error.message });
    }
  };

  const gitHubSignIn = async () => {
    try {
      await signInWithGitHub();
    } catch (error) {
      setError({ error: error.message });
    }
  };

  return (
    <div className="form-container">
      <h1>
        Sign Up to <Link to="/">Chat App</Link>
      </h1>
      <p>Fill in the form below to create an account</p>
      <form onSubmit={handleSubmit}>
        <label>
          <input
            type="textl"
            name="display-name"
            value={displayName}
            placeholder="Display Name"
            onChange={handleChange}
          />
        </label>
        <label>
          <input
            type="email"
            name="email"
            value={email}
            placeholder="Email"
            onChange={handleChange}
          />
        </label>
        <label>
          <input
            type="password"
            name="password"
            value={password}
            placeholder="Password"
            onChange={handleChange}
          />
        </label>
        {error ? <p>{error.message}</p> : null}
        <button className="btn" type="submit">
          Sign Up
        </button>
      </form>
      <div className="btn btn-group">
        <p>Or Sign Up with:</p>
        <button className="btn btn-google" type="button" onClick={googleSignIn}>
          Google
        </button>
        <button className="btn btn-github" type="button" onClick={gitHubSignIn}>
          GitHub
        </button>
        <p className="lower-p">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
