import React from "react";
import {Route, BrowserRouter as Router, Switch} from "react-router-dom";
import App from "./App";
import ServiceTable from "./Components/Services/ServicesTable";

function AppRouter() {
  return <Router>
    <Switch>
      <Route exact={true} path={"/"}>
        <App/>
      </Route>
      <Route path={"/services"}>
        <ServiceTable/>
      </Route>
    </Switch>
  </Router>
}

export default AppRouter;