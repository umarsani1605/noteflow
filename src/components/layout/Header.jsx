import React from 'react';
import SearchBar from './SearchBar';

function Header({ onSearch }) {
  return (
    <div className="flex justify-between w-[1080px] mx-auto p-4 cursor-pointer">
      <div className="flex items-center space-x-3">
        <img src="logo.svg" alt="logo" className="w-10" />
        <h1 className="font-bold text-lg text-slate-700">NoteFlow</h1>
      </div>
      <SearchBar onSearch={onSearch} />
    </div>
  );
}

export default Header;
