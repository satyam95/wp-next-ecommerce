import { combineReducers, configureStore } from "@reduxjs/toolkit";
import sessionReducer from "./sessionSlice";
import cartReducer from "./cartSlice";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage"; // Defaults to localStorage for web

// Persistence configuration
const persistConfig = {
  key: "wp-next-root",
  version: 1,
  storage,
  // Optionally, blacklist or whitelist specific reducers
  // blacklist: ['session'], // Example: exclude session from persistence
  // whitelist: ['cart'], // Example: persist only cart
};

// Combine reducers
const rootReducer = combineReducers({
  session: sessionReducer,
  cart: cartReducer,
});

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store with persisted reducer
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Infer the RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;