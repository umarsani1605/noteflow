import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

import SearchIcon from "../../assets/icons/search.svg";

function SearchBar({ onSearch }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("keyword") || "");

  useEffect(() => {
    if (searchParams.get("keyword")) {
      onSearch(searchParams.get("keyword"));
    }
  }, []);

  const handleChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);

    if (newQuery) {
      setSearchParams({ keyword: newQuery });
    } else {
      setSearchParams({});
    }

    onSearch(newQuery);
  };

  return (
    <form
      className="flex bg-slate-200 px-4 py-2 rounded-lg w-96 gap-4 outline outline-transparent hover:outline-slate-300 has-[:focus]:outline-[#007afc] transition-[border] duration-300"
      onSubmit={(e) => e.preventDefault()}
    >
      <img src={SearchIcon} alt="search-icon" className="w-5" />
      <input
        type="search"
        placeholder="Cari catatan"
        className="bg-transparent focus:outline-none w-full"
        value={query}
        onChange={handleChange}
      />
    </form>
  );
}

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default SearchBar;
