import React, { useState } from "react";
import { Link } from "react-router-dom";
import { signIn, signInWithGoogle, signInWithGitHub } from "../helpers/auth";

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
    <div>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <h1>
          Login to <Link to="/">Chat-App</Link>
        </h1>
        <p>Fill in the form below to login to your account.</p>
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
        <div className="btn-group">
          {error && <p>{error}</p>}
          <button className="login-btn" type="submit">
            Log In
          </button>
          <p>Or you can log in with: </p>
          <button className="btn-google" type="submit" onClick={googleSignIn}>
            Google
          </button>
          <button className="btn-github" type="submit" onClick={gitHubSignIn}>
            GitHub
          </button>
        </div>
        <hr />
        <p>
          Don't have an acoount? <Link to="/signup">Sign up!</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
