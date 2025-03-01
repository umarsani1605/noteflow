import React from "react";
import { Navigate, Outlet, useLocation } from "react-router"; // Fix import
import { useAuth } from "./hooks/useAuth";

function App() {
  const { isLoggedIn } = useAuth();
  const location = useLocation();

  return (
    <>
      {!isLoggedIn ? (
        <Navigate
          to="login"
          replace
          state={{ from: location }}
        />
      ) : (
        <Outlet />
      )}
    </>
  );
}

export default App;