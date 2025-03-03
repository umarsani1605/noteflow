import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router";
import { getAccessToken, getUserLogged } from "./utils/api";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import translations from "./utils/translations";
import Loading from "./components/common/Loading";

function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const initialTheme = () => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme || "light";
  };

  const initialLanguage = () => {
    const savedLanguage = localStorage.getItem("language");
    return savedLanguage || "id";
  };

  const [theme, setTheme] = useState(initialTheme);
  const [language, setLanguage] = useState(initialLanguage());

  const toggleTheme = () => {
    setTheme((prev) => {
      const newTheme = prev === "dark" ? "light" : "dark";
      document.documentElement.classList.toggle("dark", newTheme === "dark");
      localStorage.setItem("theme", newTheme);
      return newTheme;
    });
  };

  const toggleLanguage = () => {
    setLanguage((prev) => {
      const newLanguage = prev === "id" ? "en" : "id";
      localStorage.setItem("language", newLanguage);
      return newLanguage;
    });
  };

  const translate = (key) => {
    console.log("masuk");
    console.log(language);
    console.log(translations[language][key]);
    return translations[language][key];
  };

  useEffect(() => {
    async function checkAuth() {
      const token = getAccessToken();

      if (token) {
        try {
          const { data } = await getUserLogged();
          setUser(data);
        } catch (error) {
          console.error("Error checking auth: ", error);
        }
      }

      setIsLoading(false);
    }

    checkAuth();
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const savedLanguage = localStorage.getItem("language");

    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    }

    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  return (
    <ThemeProvider value={{ theme, toggleTheme }}>
      <LanguageProvider value={{ language, toggleLanguage, translate }}>
        {isLoading ? (
          <Loading />
        ) : !user ? (
          <Navigate to="login" replace />
        ) : (
          <Outlet />
        )}
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
