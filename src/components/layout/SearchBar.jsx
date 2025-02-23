import React from 'react';
import SearchIcon from '../../assets/search.svg';

function SearchBar({ onSearch }) {
  const handleChange = (e) => {
    onSearch(e.target.value);
  };
  return (
    <>
      <form className="flex bg-slate-100 px-4 py-2 rounded-lg w-80 gap-4 outline outline-transparent hover:outline-slate-300 has-[:focus]:outline-[#007afc] transition-[border] duration-300">
        <img src={SearchIcon} alt="searc-icon" className="w-5" />
        <input type="search" placeholder="Cari catatan" className="bg-transparent x-6 focus:outline-none w-full" onChange={handleChange} />
      </form>
    </>
  );
}

export default SearchBar;
