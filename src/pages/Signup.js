import React, { useState } from "react";
import { Link } from "react-router-dom";
import { signUp, signInWithGoogle, signInWithGitHub } from "../helpers/auth";

const SignUp = (props) => {
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
      await signUp(email, password);
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
      <form onSubmit={handleSubmit}>
        <h1>
          Sign Up to <Link to="/">Chat App</Link>
        </h1>
        <p>Fill in the form below to create an account</p>
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
        <div className="btn-group">
          {error && <p>{error}</p>}
          <button type="submit">Sign Up</button>
          <p>Or Sign Up with:</p>
          <button className="btn-google" type="button" onClick={googleSignIn}>
            Google
          </button>
          <button className="btn-github" type="button" onClick={gitHubSignIn}>
            GitHub
          </button>
        </div>
        <hr />
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
