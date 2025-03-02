import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { useLanguage } from "../../contexts/LanguageContext";
import SearchIcon from "../../assets/icons/search.svg";

function SearchBar({ onSearch }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("keyword") || "");
  const { t } = useLanguage();

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
      className="flex w-96 gap-4 rounded-lg bg-slate-200 px-4 py-2 outline outline-transparent transition-[border] duration-300 hover:outline-slate-300 has-[:focus]:outline-[#007afc] dark:bg-slate-700"
      onSubmit={(e) => e.preventDefault()}
    >
      <img src={SearchIcon} alt="search-icon" className="w-5" />
      <input
        type="search"
        placeholder={t("search")}
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
