import React from "react";
import Home from "./pages/Home";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import { theme } from "./theme/default";
import Dashboard from "./pages/Dashboard";
import Type from "./pages/Dashboard/search";
import Welcome from "./pages/Welcome";
import Admin from "./pages/Admin/index";

export default function App() {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Switch>
          <Route path="/" component={Home} exact />
          <PrivateRoute path="/welcome" component={Welcome} exact />
          <PrivateRoute path="/dashboard/gestion" component={Dashboard} exact />
          <PrivateRoute
            path="/dashboard/gestion/:type"
            component={Type}
            exact
          />
          <PrivateRoute path="/admin" component={Admin} exact />
        </Switch>
      </BrowserRouter>
    </ChakraProvider>
  );
}
