import React, { useState } from "react";
import { Link } from "react-router-dom";
import { signIn, signInWithGoogle, signInWithGitHub } from "../helpers/auth";
import "./LoginSignup.css";

const Login = (props) => {
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    name === "email" && setEmail(value);
    name === "password" && setPassword(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError({ error: "" });
    try {
      await signIn(email, password);
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
        Login to <Link to="/">Chat-App</Link>
      </h1>
      <p>Fill in the form below to login to your account.</p>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            placeholder="Email"
          />
        </label>
        <label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            placeholder="Password"
          />
        </label>

        {error ? <p>{error.message}</p> : null}
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
          Don't have an account?{" "}
          <Link className="link" to="/signup">
            Sign up!
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
