import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage
import searchHistoryReducer from './features/searchHistorySlice';

// Persist configuration
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['searchHistory'] // Only persist the searchHistory reducer
};

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, searchHistoryReducer);

// Configure the store
export const store = configureStore({
  reducer: {
    searchHistory: persistedReducer
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE']
      }
    })
});

// Create persistor
export const persistor = persistStore(store);