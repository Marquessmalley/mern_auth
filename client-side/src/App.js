import React from "react";
import NavRouter from "./router/NavRouter";
import { AuthContextProvider } from "./components/context/authContext";

function App() {
  return (
    <>
      <AuthContextProvider>
        <NavRouter />
      </AuthContextProvider>
    </>
  );
}

export default App;
