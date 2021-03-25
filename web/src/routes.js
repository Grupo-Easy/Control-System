import React from "react";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Type from "./pages/Dashboard/search";
import Admin from "./pages/Admin/index";
import PrivateRoute from "./components/PrivateRoute";
import { BrowserRouter, Switch, Route } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Home} exact />
        <PrivateRoute path="/dashboard" component={Dashboard} exact />
        <PrivateRoute path="/dashboard/:type" component={Type} exact />
        <PrivateRoute path="/admin" component={Admin} exact />
      </Switch>
    </BrowserRouter>
  );
}
