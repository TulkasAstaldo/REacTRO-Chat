import React, { Component } from "react";
import { Link } from "react-router-dom";
import { signUp, signInWithGoogle, signInWithGitHub } from "../helpers/auth";

export default class SignUp extends Component {
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
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({ error: "" });
    try {
      await signUp(this.state.email, this.state.password);
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
        <form onSubmit={this.handleSubmit}>
          <h1>
            Sign Up to <Link to="/">Chat App</Link>
          </h1>
          <p>Fill in the form below to create an account</p>
          <label>
            <input
              type="email"
              name="email"
              value={this.state.email}
              placeholder="Email"
              onChange={this.handleChange}
            />
          </label>
          <label>
            <input
              type="password"
              name="password"
              value={this.state.password}
              placeholder="Password"
              onChange={this.handleChange}
            />
          </label>
          <div className="btn-group">
            {this.state.error && <p>{this.state.error}</p>}
            <button type="submit">Sign Up</button>
            <p>Or Sign Up with:</p>
            <button
              className="btn-google"
              type="button"
              onClick={this.googleSignIn}
            >
              Google
            </button>
            <button
              className="btn-github"
              type="button"
              onClick={this.gitHubSignIn}
            >
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
  }
}
