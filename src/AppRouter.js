import React, {useState} from "react";
import {Route, BrowserRouter as Router, Switch} from "react-router-dom";
import App from "./App";
import ServiceTable from "./Components/Services/ServicesTable";
import Login from "./Components/User/Login";
import Credentials from "./Context/Credentials";

function AppRouter() {
  const [credentials, setCredentials] = useState();

  return <Router>
    <Switch>
      <Route exact={true} path={"/"}>
        <App/>
      </Route>
      <Route path={"/services"}>
        <ServiceTable/>
      </Route>
      <Route path={'/login'}>
        <Credentials.Provider value={credentials}>
          <Login setCredentials={setCredentials}/>
        </Credentials.Provider>
      </Route>
    </Switch>
  </Router>
}

export default AppRouter;