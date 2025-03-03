import PropTypes from "prop-types";
import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router";
import { getUserLogged, putAccessToken } from "../../utils/api";

import ThemeContext from "../../contexts/ThemeContext";
import LanguageContext from "../../contexts/LanguageContext";

import Avatar from "../../assets/img/avatar.jpg";
import Logo from "../../assets/img/logo.svg";
import SearchBar from "./SearchBar";

import {
  SunIcon,
  MoonIcon,
  ArrowLeftStartOnRectangleIcon,
} from "@heroicons/react/24/outline";

import IdFlag from "../../assets/icons/id_flag.svg";
import GbFlag from "../../assets/icons/gb_flag.svg";

function Header({ onSearch, showSearchBar = true }) {
  const [user, setUser] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { theme, toggleTheme } = useContext(ThemeContext);
  const { language, toggleLanguage, translate } = useContext(LanguageContext);

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
            className="flex gap-2 rounded-lg border border-slate-200/75 px-3 py-2 text-sm font-medium text-slate-800 hover:bg-slate-100 dark:border-slate-700 dark:text-white dark:hover:bg-slate-700"
          >
            <img
              src={language == "id" ? IdFlag : GbFlag}
              alt="theme-toggle"
              className="h-5 w-5 dark:text-white"
            />
            {language === "id" ? "ID" : "EN"}
          </button>
          <button
            onClick={toggleTheme}
            className="rounded-lg border border-slate-200/75 p-2 hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-700"
          >
            {theme === "dark" ? (
              <MoonIcon className="h-5 w-5 dark:text-white" />
            ) : (
              <SunIcon className="h-5 w-5 dark:text-white" />
            )}
          </button>
          <img
            src={Avatar}
            alt=""
            className="w-10 cursor-pointer rounded-full border-2 border-slate-200 dark:border-slate-600"
            onClick={toggleDropdown}
          />
          {isDropdownOpen && (
            <div className="absolute right-0 top-12 flex flex-col gap-2 rounded-lg border border-slate-200 bg-white p-4 shadow-md dark:border-slate-700 dark:bg-slate-800">
              <div className="flex flex-col border-b border-slate-200 pb-4">
                <div className="font-bold text-slate-700 dark:text-white">
                  {user?.name}
                </div>
                <div className="text-sm text-slate-500 dark:text-slate-400">
                  {user?.email}
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center pt-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white"
              >
                <ArrowLeftStartOnRectangleIcon className="mr-2 h-5 w-5 rotate-180" />
                {translate("logout")}
              </button>
            </div>
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
