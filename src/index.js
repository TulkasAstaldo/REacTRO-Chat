import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import { UserProvider } from "./Context";
import { ThemeProvider } from "./ThemeContext";

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <ThemeProvider>
        <Router>
          <App />
        </Router>
      </ThemeProvider>
    </UserProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
