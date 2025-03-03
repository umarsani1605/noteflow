import PropTypes from "prop-types";
import React, { useEffect, useState, useContext } from "react";
import { useSearchParams } from "react-router";
import SearchIcon from "../../assets/icons/search.svg";
import LanguageContext from "../../contexts/LanguageContext";

function SearchBar({ onSearch }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("keyword") || "");
  const { translate } = useContext(LanguageContext);

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
      className="flex w-96 gap-4 rounded-lg bg-slate-200 px-4 py-2 outline outline-transparent transition-[border] duration-300 hover:outline-slate-300 has-[:focus]:outline-[#007afc] dark:bg-slate-700 dark:hover:outline-slate-500 dark:has-[:focus]:outline-[#007afc]"
      onSubmit={(e) => e.preventDefault()}
    >
      <img src={SearchIcon} alt="search-icon" className="w-5" />
      <input
        type="search"
        placeholder={translate("search")}
        className="w-full bg-transparent focus:outline-none dark:text-white dark:placeholder-slate-400"
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
