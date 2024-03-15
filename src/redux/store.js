// store.js
import { configureStore } from '@reduxjs/toolkit';
import contactsReducer from './contactsSlice';
import { combineReducers } from 'redux';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './authSlice';

const rootReducer = combineReducers({
  contacts: contactsReducer, // reducerii tăi
  auth: authReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['contacts'], // Adaugă acest rând pentru a exclude reducerul contacts din persistență
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);