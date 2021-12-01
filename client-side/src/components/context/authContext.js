import React, { useState, useEffect, createContext } from "react";
import axios from "axios";

const authContext = createContext();

// this component provides the value of true/false if user is logged in or not
const AuthContextProvider = (props) => {
  const [loggedIn, setLoggedIn] = useState(undefined);

  const getLoggedIn = async () => {
    const loggedInRes = await axios({
      method: "get",
      url: "http://localhost:4000/api/v1/loggedin",
      withCredentials: true,
      credentials: "include",
    });
    setLoggedIn(loggedInRes.data);
  };

  useEffect(() => {
    getLoggedIn();
  });

  return (
    <authContext.Provider value={{ loggedIn, getLoggedIn }}>
      {props.children}
    </authContext.Provider>
  );
};
export default authContext;
export { AuthContextProvider };
