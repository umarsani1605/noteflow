import React from 'react';
import { Link } from 'react-router';

import SearchBar from './SearchBar';

function Header({ onSearch, showSearchBar = true }) {
  return (
    <div className="bg-white border-b border-slate-200">
      <div className="flex justify-between w-[1080px] h-16 mx-auto p-3 cursor-pointer">
        <Link to="/" className="flex items-center space-x-3">
          <img src="logo.svg" alt="logo" className="w-10" />
          <h1 className="font-bold text-lg text-slate-700">NoteFlow</h1>
        </Link>
        {showSearchBar && <SearchBar onSearch={onSearch} />}
      </div>
    </div>
  );
}

export default Header;
