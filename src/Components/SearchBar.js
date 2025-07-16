import React, { useState, useCallback } from 'react';
import axios from 'axios';
import debounce from 'lodash.debounce';
import { FaSearch } from "react-icons/fa";
import './SearchBar.css';

const SearchBar = ({ word, setWord, loading, searchWord }) => {
  const [suggestions, setSuggestions] = useState([]);

  const fetchSuggestions = useCallback(
    debounce(async (value) => {
      if (!value) return setSuggestions([]);
      try {
        const res = await axios.get(
          `https://api.datamuse.com/sug?s=${value}`
        );
        setSuggestions(res.data.slice(0, 8));
      } catch {
        setSuggestions([]);
      }
    }, 300),
    []
  );

  const handleChange = (e) => {
    const value = e.target.value;
    setWord(value);
    fetchSuggestions(value.trim());
  };

  const choose = (w) => {
    setWord(w);
    setSuggestions([]);
    searchWord({ preventDefault: () => {} }, w);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      searchWord(e);
      setSuggestions([]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    searchWord(e);
    setSuggestions([]);
  };

  return (
    <div className="search-bar">
      <form onSubmit={handleSubmit}>
        <div className="search-input-container">
          <input
            type="text"
            placeholder="Search a word..."
            value={word}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            autoComplete="off"
            disabled={loading}
          />
          <button type="submit" disabled={loading}>
            <FaSearch />
            <span className="search-text">Search</span>
          </button>
        </div>
      </form>

      {suggestions.length > 0 && (
        <ul className="suggestions">
          {suggestions.map((s) => (
            <li key={s.word} onClick={() => choose(s.word)}>
              {s.word}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;