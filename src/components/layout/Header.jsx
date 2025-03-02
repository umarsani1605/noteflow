import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { getUserLogged, putAccessToken } from "../../utils/api";

import Avatar from "../../assets/img/avatar.jpg";
import Logo from "../../assets/img/logo.svg";
import SearchBar from "./SearchBar";
import { useTheme } from "../../contexts/ThemeContext";
import { useLanguage } from "../../contexts/LanguageContext";
import MoonIcon from "../../assets/icons/moon.svg";
import SunIcon from "../../assets/icons/sun.svg";

function Header({ onSearch, showSearchBar = true }) {
  const [user, setUser] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();
  const { language, toggleLanguage, t } = useLanguage();
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data } = await getUserLogged();
        setUser(data);
      } catch (error) {
        console.error(error);
      }
    };
    getUser();
  }, []);

  const handleLogout = () => {
    putAccessToken("");
    navigate("/login");
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="border-b border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800">
      <div className="mx-auto flex h-16 w-[1080px] justify-between p-3">
        <Link to="/" className="flex items-center space-x-3">
          <img src={Logo} alt="logo" className="w-10" />
          <h1 className="text-lg font-bold text-slate-700 dark:text-white">
            NoteFlow
          </h1>
        </Link>
        {showSearchBar && <SearchBar onSearch={onSearch} />}
        <div className="relative flex items-center space-x-4">
          <button
            onClick={toggleLanguage}
            className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:text-white dark:hover:bg-slate-700"
          >
            {language === "id" ? "EN" : "ID"}
          </button>
          <button
            onClick={toggleTheme}
            className="rounded-lg p-2 hover:bg-slate-100 dark:hover:bg-slate-700"
          >
            <img
              src={isDarkMode ? SunIcon : MoonIcon}
              alt="theme-toggle"
              className="h-5 w-5 dark:text-white"
            />
          </button>
          <img
            src={Avatar}
            alt=""
            className="w-10 cursor-pointer rounded-full border-2 border-slate-200 dark:border-slate-600"
            onClick={toggleDropdown}
          />
          {isDropdownOpen && (
            <ul className="absolute right-0 top-12 flex flex-col gap-2 rounded-lg border border-slate-200 bg-white p-4 shadow-md dark:border-slate-700 dark:bg-slate-800">
              <li className="text-sm font-bold text-slate-700 dark:text-white">
                {user?.name}
              </li>
              <li className="text-xs text-slate-500 dark:text-slate-400">
                {user?.email}
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="text-xs text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white"
                >
                  {t("logout")}
                </button>
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

Header.propTypes = {
  onSearch: PropTypes.func,
  showSearchBar: PropTypes.bool,
};

export default Header;
