import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "../components/layouts/navbar";
import Home from "../components/pages/Home";
import Login from "../components/pages/Login";
import Signup from "../components/pages/Signup";
import Dashboard from "../components/pages/Dashboard";
import LandingPage from "../components/pages/LandingPage";
import authContext from "../components/context/authContext";

const NavRouter = () => {
  const { loggedIn } = useContext(authContext);
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" exact element={<LandingPage />} />
        {loggedIn ? (
          <>
            <Route path="/home" exact element={<Home />} />
            <Route path="/dashboard" exact element={<Dashboard />} />
          </>
        ) : (
          <>
            <Route path="/signup" exact element={<Signup />} />
            <Route path="/login" exact element={<Login />} />
          </>
        )}
      </Routes>
    </Router>
  );
};

export default NavRouter;
