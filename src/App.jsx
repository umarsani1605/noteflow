import React, { useState } from "react";
import { Navigate, Outlet } from "react-router";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
}

export default App;
