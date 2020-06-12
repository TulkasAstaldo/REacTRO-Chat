import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="home">
      <section>
        <div className="jumbotron jumbotron-fluid py-5">
          <div className="container text-center py-5">
            <h1 className="display-4">Welcome to Chatty</h1>
            <p className="lead">
              A great place to share your thoughts with friends
            </p>
            <div className="mt-4">
              <Link className="btn btn-primary px-5 mr-3" to="/signup">
                Create New Account
              </Link>
              <Link className="btn px-5" to="/login">
                Log In to Your Account
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
