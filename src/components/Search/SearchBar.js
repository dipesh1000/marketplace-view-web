import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { BiSearch } from "react-icons/bi";
import { Button, Form, FormControl } from "react-bootstrap";
import { useParams } from "react-router";
import SearchResults from "./SearchResults";

const SearchBar = ({ styles, scrollState, type }) => {
  const history = useHistory();
  const { searchTerm } = useParams();
  const [searchWord, setSearchWord] = useState(searchTerm || "");
  const [searchDiv, setSearchDiv] = useState(false);
  const searchLength = localStorage.getItem("search");

  const handleSearch = (e) => {
    setSearchWord(
      e.target.value.length > 3
        ? e.target.value?.toLowerCase()
        : e.target.value?.toLowerCase().trim()
    );
    setSearchDiv(true);
    !searchLength && !e.target.value && setSearchDiv(false);
  };

  const handleKeyPress = (e) => {
    e.preventDefault();
    setSearchDiv(false);
    history.push(`/search/${searchWord}`);
    var existing = localStorage.getItem("search");
    existing = existing ? existing.split(",") : [];
    existing.push(searchWord);
    localStorage.setItem("search", existing.toString());
  };
  return (
    <Form
      inline
      className={` ${
        scrollState !== `active` && type === "GuestNav"
          ? styles.hide
          : styles.searchNav
      }`}
      onSubmit={(searchWord || searchTerm) && handleKeyPress}
    >
      <FormControl
        size="sm"
        type="text"
        value={searchWord}
        placeholder="Find Services"
        className={`${styles.searchInputNav}`}
        onChange={handleSearch}
        onClick={() => searchLength && setSearchDiv(true)}
      />
      <SearchResults
        searchWord={searchWord}
        setSearchWord={setSearchWord}
        searchDiv={searchDiv}
        setSearchDiv={setSearchDiv}
      />

      <BiSearch className={styles.search_icon} />
      {searchWord && (
        <i
          className={`fas fa-times ${styles.cancel_icon}`}
          onClick={() => setSearchWord("")}
        ></i>
      )}

      <Button size="sm" className={styles.searchButtonNav} type="submit">
        Search
      </Button>
    </Form>
  );
};

export default SearchBar;
