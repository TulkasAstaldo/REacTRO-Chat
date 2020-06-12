import React, { Component } from "react";
import { Link } from "react-router-dom";
import { signIn, signInWithGoogle, signInWithGitHub } from "../helpers/auth";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      email: "",
      password: "",
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({ error: "" });
    try {
      await signIn(this.state.email, this.state.password);
    } catch (error) {
      this.setState({ error: error.message });
    }
  };

  googleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      this.setState({ error: error.message });
    }
  };

  gitHubSignIn = async () => {
    try {
      await signInWithGitHub();
    } catch (error) {
      this.setState({ error: error.message });
    }
  };

  render() {
    return (
      <div>
        <form autoComplete="off" onSubmit={this.handleSubmit}>
          <h1>
            Login to <Link to="/">Chat-App</Link>
          </h1>
          <p>Fill in the form below to login to your account.</p>
          <label>
            <input
              type="email"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
              placeholder="Email"
            />
          </label>
          <label>
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
              placeholder="Password"
            />
          </label>
          <div className="btn-group">
            {this.state.error && <p>{this.state.error}</p>}
            <button className="login-btn" type="submit">
              Log In
            </button>
            <p>Or you can log in with: </p>
            <button
              className="btn-google"
              type="submit"
              onClick={this.googleSignIn}
            >
              Google
            </button>
            <button
              className="btn-github"
              type="submit"
              onClick={this.gitHubSignIn}
            >
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
  }
}
