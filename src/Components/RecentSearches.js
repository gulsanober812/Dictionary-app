// src/Components/RecentSearches.js
import { useSelector, useDispatch } from 'react-redux';
import { clearHistory } from '../features/searchHistorySlice';
import'./RecentSearches.css';
const RecentSearches = ({ setWord }) => {
  const recentSearches = useSelector((state) => state.searchHistory.searches);
  const dispatch = useDispatch();

  return (
    <div className="recent-searches">
      <div className="recent-header">
        <h3>Recent Searches</h3>
        {recentSearches.length > 0 && (
          <button 
            onClick={() => dispatch(clearHistory())}
            className="clear-history-btn"
           
          >
            Clear
          </button>
        )}
      </div>
      <div className="recent-words">
        {recentSearches.map((search, index) => (
          <span 
            key={index} 
            className="recent-word"
            onClick={() => setWord(search)}
          >
            {search}
          </span>
        ))}
      </div>
    </div>
  );
};

export default RecentSearches;