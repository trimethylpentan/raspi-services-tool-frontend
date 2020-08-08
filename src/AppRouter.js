import React from "react";
import {Route, BrowserRouter as Router, Switch} from "react-router-dom";
import { createBrowserHistory } from 'history';
import App from "./App";
import ListServices from "./ListServices";

function AppRouter() {
  return <Router history={createBrowserHistory()}>
    <Switch>
      <Route path={"/"}>
        <App/>
      </Route>
      <Route path={"/services/list"}>
        <ListServices/>
      </Route>
    </Switch>
  </Router>
}

export default AppRouter;