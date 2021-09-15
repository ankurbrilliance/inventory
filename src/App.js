import React from "react";
import "./App.css";
import Login from "./Components/Login/Login";
import {
  Route,
  Redirect,
  Link,
  BrowserRouter as Router,
} from "react-router-dom";
import Dashboard from "./Components/Dashboard/Dash_Home";
import CreateOrder from "./Components/CreateOrder/CreateOrder";
import ListOrder from "./Components/ListOrder/ListOrder";
import AddUser from "./Components/AddUser/AddUser";
import PurchaseOrder from "./Components/Purchase/Purchase_Order";

function App(props) {
  console.log(props);
  const authGuard = (Component) => () => {
    return localStorage.getItem("token") ? (
      <Component />
    ) : (
      <Redirect exact to="/login" />
    );
  };
  const token = localStorage.getItem("token");
  return (
    <>
      <Router {...props}>
        <Link to="/login" />
        <Route exact path="/login" component={!token ? Login : Dashboard} />

        <Route path="/web-front" render={authGuard(Dashboard)} />
        <Route
          path={`${window.location.pathname}/create_order`}
          render={authGuard(CreateOrder)}
        />
        <Route
          path={`${window.location.pathname}/purchase_order`}
          render={authGuard(PurchaseOrder)}
        />
        <Route
          path={`${window.location.pathname}/listOrder`}
          render={authGuard(ListOrder)}
        />
        <Route
          path={`${window.location.pathname}/addUser`}
          render={authGuard(AddUser)}
        />
      </Router>
    </>
  );
}

export default App;
