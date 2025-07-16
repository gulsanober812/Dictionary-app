import React, { useState, useEffect, useMemo, useCallback } from 'react';
import axios from 'axios';
import './DailyVocabulary.css';

const DailyVocabulary = ({ setWord }) => {
  const [vocabulary, setVocabulary] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showVocab, setShowVocab] = useState(false);
  const [error, setError] = useState(null);

  // Reliable fallback vocabulary with definitions
  const fallbackVocabulary = useMemo(() => [
    { word: "ephemeral", definition: "Lasting for a very short time" },
    { word: "cognizant", definition: "Having knowledge or awareness" },
    { word: "loquacious", definition: "Tending to talk a great deal" },
    { word: "epiphany", definition: "A moment of sudden revelation" },
    { word: "serendipity", definition: "Finding something good by chance" },
    { word: "ubiquitous", definition: "Present everywhere simultaneously" },
    { word: "voracious", definition: "Wanting or consuming great quantities" },
    { word: "plethora", definition: "A large or excessive amount" },
    { word: "eloquent", definition: "Fluent or persuasive in speaking" },
    { word: "resilient", definition: "Able to recover quickly from difficulties" }
  ], []);

  const saveVocabulary = useCallback((words) => {
    const today = new Date().toDateString();
    localStorage.setItem('vocabularyDate', today);
    localStorage.setItem('dailyVocabulary', JSON.stringify(words));
  }, []);

  const fetchVocabulary = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Try to fetch from API first
      const wordsResponse = await axios.get(
        'https://api.datamuse.com/words?topics=education&max=5'
      );
      
      // Get definitions for the words
      const wordsWithDefinitions = await Promise.all(
        wordsResponse.data.slice(0, 5).map(async (item) => {
          try {
            const defResponse = await axios.get(
              `https://api.dictionaryapi.dev/api/v2/entries/en/${item.word}`
            );
            return {
              word: item.word,
              definition: defResponse.data[0]?.meanings[0]?.definitions[0]?.definition || 
                        "Interesting word (definition not available)"
            };
          } catch {
            return {
              word: item.word,
              definition: "Interesting word (definition not available)"
            };
          }
        })
      );

      // Fill with fallback words if we didn't get enough
      const finalWords = [...wordsWithDefinitions];
      while (finalWords.length < 5) {
        const randomFallback = fallbackVocabulary[
          Math.floor(Math.random() * fallbackVocabulary.length)
        ];
        finalWords.push(randomFallback);
      }

      setVocabulary(finalWords);
      saveVocabulary(finalWords);
    } catch (apiError) {
      console.error("API failed, using fallback:", apiError);
      setVocabulary(fallbackVocabulary);
      saveVocabulary(fallbackVocabulary);
    } finally {
      setLoading(false);
    }
  }, [fallbackVocabulary, saveVocabulary]);

  useEffect(() => {
    const today = new Date().toDateString();
    const savedDate = localStorage.getItem('vocabularyDate');
    const savedVocab = JSON.parse(localStorage.getItem('dailyVocabulary') || null);

    if (savedDate === today && savedVocab?.length > 0) {
      setVocabulary(savedVocab);
    } else {
      fetchVocabulary();
    }
  }, [fetchVocabulary]); // Added fetchVocabulary to dependencies

  const handleWordClick = (word) => {
    setWord(word);
    setShowVocab(false);
  };

  return (
    <div className="daily-vocabulary">
      <button 
        onClick={() => setShowVocab(!showVocab)}
        className="vocab-btn"
        disabled={loading}
      >
        {loading ? 'Loading...' : 'Daily Vocabulary'}
      </button>

      {showVocab && (
        <div className="vocab-popup">
          <h4>Today's Vocabulary</h4>
          {error ? (
            <div className="error-message">{error}</div>
          ) : vocabulary.length === 0 ? (
            <div className="loading-vocab">Loading words...</div>
          ) : (
            <ul>
              {vocabulary.map((item, index) => (
                <li key={index}>
                  <div 
                    className="vocab-word"
                    onClick={() => handleWordClick(item.word)}
                  >
                    <strong>{item.word}</strong>
                    <button 
                      className="speak-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        new Audio(`https://api.dictionaryapi.dev/media/pronunciations/en/${item.word}-us.mp3`)
                          .play()
                          .catch(() => console.log("Pronunciation not available"));
                      }}
                      aria-label={`Pronounce ${item.word}`}
                    >
                      🔊
                    </button>
                  </div>
                  <div className="vocab-definition">{item.definition}</div>
                </li>
              ))}
            </ul>
          )}
           <button 
                className="close-popup-btn"
                onClick={() => setShowVocab(false)}
              >
                Close
              </button>
        </div>
      )}
    </div>
  );
};

export default DailyVocabulary;