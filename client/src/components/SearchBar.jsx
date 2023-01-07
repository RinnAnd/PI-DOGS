import React from "react";
import { useState} from "react";
import { useDispatch } from "react-redux";
import "./SearchBar.css";
import { dogByName } from "../actions/actions";

const SearchBar = ({ paging }) => {
  const dispatch = useDispatch();
  const [text, setText] = useState("");

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(dogByName(text));
    paging(1)
    setText("");
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search dogs"
        className="searchbar"
        value={text}
        onChange={e => handleChange(e)}
      />
      <button
        className="search-btn"
        type="submit"
        onClick={(e) => handleSearch(e)}
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
