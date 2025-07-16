// src/features/searchHistory/searchHistorySlice.js
import { createSlice } from '@reduxjs/toolkit';

const searchHistorySlice = createSlice({
  name: 'searchHistory',
  initialState: {
    searches: [],
  },
  reducers: {
    addSearch: (state, action) => {
      const newSearch = action.payload.toLowerCase();
      if (!state.searches.includes(newSearch)) {
        state.searches = [newSearch, ...state.searches].slice(0, 10); // Keep last 10 searches
      }
    },
    clearHistory: (state) => {
      state.searches = [];
    },
  },
});

export const { addSearch, clearHistory } = searchHistorySlice.actions;
export default searchHistorySlice.reducer;