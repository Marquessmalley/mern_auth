import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container } from "@mui/material";

const Home = () => {
  const [myName, setMyName] = useState();
  const getUserInfo = async () => {
    const userInfo = await axios({
      method: "get",
      url: "http://localhost:4000/api/v1/home",
      withCredentials: true,
      credentials: "include",
    });

    setMyName(userInfo.data.user.name);
  };

  useEffect(() => {
    getUserInfo();
  });
  return (
    <Container
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1>Welcome to the Home Page {myName} </h1>
    </Container>
  );
};

export default Home;
