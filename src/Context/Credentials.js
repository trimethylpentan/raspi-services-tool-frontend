import React from "react";
import cookie from "cookie";

const cookies = cookie.parse(document.cookie);

const Credentials = React.createContext(cookies.token || null);

export default Credentials;