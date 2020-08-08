import React from "react";
import {Route, Router} from "react-router-dom";
import { createBrowserHistory } from 'history';
import App from "./App";
import ListServices from "./ListServices";

function AppRouter() {
  console.log(createBrowserHistory());
  return <Router history={createBrowserHistory()}>
    <Route path={"/"}>
      <App/>
    </Route>
    <Route path={"/services/list"}>
      <ListServices/>
    </Route>
  </Router>
}

export default AppRouter;