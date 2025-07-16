import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { addSearch } from './features/searchHistorySlice';
import './App.css';

import Header from './Components/Header';
import Loader from './Components/Loader';
import SearchBar from './Components/SearchBar';
import RecentSearches from './Components/RecentSearches';
import WordDetails from './Components/WordDetails'; 
import WordOfTheDay from './Components/WordOfTheDay'; 
import ErrorMessage from './Components/ErrorMessage';

export const playAudio = (audioUrl) => {
  if (audioUrl) {
    const audio = new Audio(audioUrl);
    audio.play().catch(e => console.error("Audio playback failed:", e));
  }
};

const DictionaryApp = () => {
  const [word, setWord] = useState('');
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [wordOfTheDay, setWordOfTheDay] = useState(null);

  // Redux hooks
  const dispatch = useDispatch();
  const recentSearches = useSelector((state) => state.searchHistory);

  const fetchWordOfTheDay = async () => {
    try {
      const response = await axios.get(
        `https://api.dictionaryapi.dev/api/v2/entries/en/hello`
      );
      setWordOfTheDay(response.data[0]);
    } catch (err) {
      console.error("Couldn't fetch word of the day:", err);
    }
  };

  useEffect(() => {
    fetchWordOfTheDay();
  }, []);

  const searchWord = async (e, customWord) => {
    if (e && e.preventDefault) e.preventDefault();
    const searchTerm = customWord || word.trim();
    if (!searchTerm) return;

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${searchTerm}`
      );
      setResults(response.data[0]);
      dispatch(addSearch(searchTerm.toLowerCase()));
    } catch (err) {
      setError("Word not found. Please try another word.");
      setResults(null);
    } finally {
      setLoading(false);
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`dictionary-app ${darkMode ? 'dark-mode' : ''}`}>
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      
      <SearchBar 
        word={word} 
        setWord={setWord} 
        loading={loading} 
        searchWord={searchWord} 
      />
      
      <RecentSearches 
        recentSearches={recentSearches} 
        setWord={setWord} 
      />

      {!results && !error && wordOfTheDay && (
        <WordOfTheDay wordData={wordOfTheDay} />
      )}

      {loading && <Loader />}
      {error && <ErrorMessage error={error} />}
      {results && <WordDetails wordData={results} />}
    </div>
  );
};

export default DictionaryApp;