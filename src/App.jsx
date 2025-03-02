import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router";
import { getAccessToken, getUserLogged } from "./utils/api";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import Loading from "./components/common/Loading";

function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      const token = getAccessToken();

      if (token) {
        try {
          const { data } = await getUserLogged();
          setUser(data);
        } catch (error) {
          console.error("Error checking auth:", error);
        }
      }

      setIsLoading(false);
    };

    checkAuth();
  }, []);

  return (
    <ThemeProvider>
      <LanguageProvider>
        {isLoading ? (
          <Loading />
        ) : !user ? (
          <Navigate to="login" replace state={{ from: location }} />
        ) : (
          <Outlet />
        )}
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
