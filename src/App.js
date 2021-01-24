import React, {useContext} from 'react';
import Credentials from "./Context/Credentials";
import {Redirect} from "react-router";

function App() {
  const credentials = useContext(Credentials);
  if (credentials === null) {
    // User is not logged in. Redirect to login.
    return <Redirect to={'/login'}/>
  }

  return <div>
    <p>Need for hier ist nichts</p>
  </div>
}

export default App;
