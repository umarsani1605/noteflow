import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router";

import Avatar from "../../assets/img/avatar.jpg";
import Logo from "../../assets/img/logo.svg";
import SearchBar from "./SearchBar";

function Header({ onSearch, showSearchBar = true }) {
  return (
    <div className="bg-white border-b border-slate-200">
      <div className="flex justify-between w-[1080px] h-16 mx-auto p-3">
        <Link to="/" className="flex items-center space-x-3">
          <img src={Logo} alt="logo" className="w-10" />
          <h1 className="font-bold text-lg text-slate-700">NoteFlow</h1>
        </Link>
        {showSearchBar && <SearchBar onSearch={onSearch} />}
        <div className="flex items-center space-x-4">
          <img
            src={Avatar}
            alt=""
            className="w-10 rounded-full border-2 border-slate-200 cursor-pointer"
          />
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
