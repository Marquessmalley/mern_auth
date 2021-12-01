import React, { useState } from "react";
import { Link } from "react-router-dom";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import { TextField } from "@mui/material";
import { Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      await axios({
        method: "post",
        url: "http://localhost:4000/api/v1/login",
        data: { email, password },
        withCredentials: true,
        credentials: "include",
      })
        .then((res) => {
          const data = res.data;
          if (data.user) {
            window.location.href = "/home";
          }
          // If errors
          if (data.email || data.name || data.password) {
            setErrors({
              ...errors,
              name: data.name,
              email: data.email,
              password: data.password,
            });
          }
        })
        .catch(() => {
          console.log("Has been a error");
        });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container maxWidth="md" sx={{ height: "70vh" }}>
      <Box
        sx={{
          height: "70vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            height: "15vh",
            width: "30vw",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ background: "rgb(51, 153, 255)" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography variant="h4">Sign In</Typography>
        </Box>

        <Box
          component="form"
          onSubmit={loginUser}
          sx={{
            height: "30vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <TextField
            type="text"
            label="Email"
            name="email"
            variant="outlined"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            size="normal"
            required
            sx={{ width: "20vw" }}
          />

          <TextField
            type="password"
            label="Password"
            name="password"
            variant="outlined"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            size="nomral"
            required
          />

          <Button
            variant="contained"
            size="medium"
            type="submit"
            sx={{ background: "rgb(51, 153, 255)" }}
          >
            Login
          </Button>
        </Box>
        {/* ERRORS */}
        <Box sx={{ padding: "1rem" }}>
          <Typography variant="h6" color="red">
            {errors.email}
            {errors.password}
          </Typography>
        </Box>

        <Box sx={{ width: "20vw", marginTop: "1rem" }}>
          <Link to="/signup">Dont have an account? Sign Up!</Link>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
