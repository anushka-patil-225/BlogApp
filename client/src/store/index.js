import { combineReducers, configureStore, createSlice } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Uses localStorage for web
import { PersistGate } from "redux-persist/integration/react"; // Optional for React
import { Provider } from "react-redux";

// Auth Slice
const authSlice = createSlice({
  name: "auth",
  initialState: { isLoggedIn: false },
  reducers: {
    login(state) {
      console.log("updating");
      state.isLoggedIn = true;
    },
    logout(state) {
      localStorage.removeItem("userId");
      state.isLoggedIn = false;
    },
  },
});

// Theme Slice
const themeSlice = createSlice({
  name: "theme",
  initialState: {
    isDarkmode: false,
  },
  reducers: {
    setDarkmode: (state, action) => {
      state.isDarkmode = action.payload;
    },
  },
});

// Actions
export const authActions = authSlice.actions;
export const setDarkmode = themeSlice.actions.setDarkmode;

// Root Reducer
const rootReducer = combineReducers({
  auth: authSlice.reducer,
  theme: themeSlice.reducer,
});

// Redux Persist Config
const persistConfig = {
  key: "root", // Key to store data in localStorage
  storage, // Use localStorage
};

// Wrap rootReducer with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Store
export const store = configureStore({
  reducer: persistedReducer,
});

// Persistor
export const persistor = persistStore(store);
