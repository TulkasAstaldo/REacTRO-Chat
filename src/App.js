import React, { useContext } from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import SignUp from "./pages/Signup";
import Login from "./pages/Login";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PrivateRoute from "./HOCs/PrivateRoute";
import PublicRoute from "./HOCs/PublicRoute";
import "./App.css";
import Profile from "./components/Profile";
import { UserContext } from "./Context";
import { ThemeContext } from "./ThemeContext";

const App = () => {
  const { user, loading, authenticated } = useContext(UserContext);
  const { theme } = useContext(ThemeContext);

  const style = {
    backgroundImage: `url(${theme})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    height: "100%",
    margin: 0,
    padding: 0,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignContent: "center",
    alignItems: "center",
    color: "white",
    textAlign: "center",
  };

  return loading === true ? (
    <div className="loading">
      <h2>Loading...</h2>
    </div>
  ) : (
    <div style={style}>
      <Header />
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <PrivateRoute
          path="/chat"
          authenticated={authenticated}
          component={Chat}
        ></PrivateRoute>
        <PrivateRoute
          path="/profile"
          authenticated={authenticated}
          component={Profile}
        ></PrivateRoute>
        <PublicRoute
          path="/signup"
          authenticated={authenticated}
          component={SignUp}
        ></PublicRoute>
        <PublicRoute
          path="/login"
          authenticated={authenticated}
          component={Login}
        ></PublicRoute>
      </Switch>
      <Footer />
    </div>
  );
};

export default App;
