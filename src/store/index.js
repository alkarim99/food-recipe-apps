/* eslint-disable prettier/prettier */
// import {combineReducers, configureStore, getDefaultMiddleware } from 'redux';
import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
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
// import storage from 'redux-persist/lib/storage';
import storage from '@react-native-async-storage/async-storage';

import counterReducer from './reducers/counterSlice';
import authSlice from './reducers/authSlice';

const persistConfig = {
  key: 'root',
  storage,
};

const reducers = combineReducers({counterReducer, authSlice});

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});
