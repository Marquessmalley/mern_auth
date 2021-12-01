import React from "react";
import { Button } from "@mui/material";
import axios from "axios";

const Logout = () => {
  const logOut = async () => {
    await axios({
      method: "get",
      url: "http://localhost:4000/api/v1/logout",
      withCredentials: true,
      credentials: "include",
    });
    window.location.href = "/login";
  };
  return (
    <div>
      <Button variant="contained" size="medium" onClick={logOut}>
        Logout
      </Button>
    </div>
  );
};

export default Logout;
