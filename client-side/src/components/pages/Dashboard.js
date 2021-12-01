import React from "react";
import { Container } from "@mui/material";

const Dashboard = () => {
  return (
    <Container
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1>Dashboard page(Authorized Access Only.)</h1>
    </Container>
  );
};

export default Dashboard;
