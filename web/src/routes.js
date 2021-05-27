import React from "react";
import Home from "./pages/Home";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import { theme } from "./theme/default";
import Dashboard from "./pages/Dashboard";
import Type from "./pages/Dashboard/search";
import Welcome from "./pages/Welcome";
import Admin from "./pages/Admin";
import Kanban from "./pages/Kanban";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export default function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <ChakraProvider theme={theme}>
        <BrowserRouter>
          <Switch>
            <Route path="/" component={Home} exact />
            <PrivateRoute path="/welcome" component={Welcome} exact />
            <PrivateRoute
              path="/dashboard/gestion"
              component={Dashboard}
              exact
            />
            <PrivateRoute
              path="/dashboard/gestion/:type"
              component={Type}
              exact
            />
            <PrivateRoute path="/admin" component={Admin} exact />
            <PrivateRoute path="/dashboard/kanban" component={Kanban} />
          </Switch>
        </BrowserRouter>
      </ChakraProvider>
    </DndProvider>
  );
}
