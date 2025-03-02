import { configureStore } from "@reduxjs/toolkit";
import sessionReducer from './sessionSlice';

export const store = configureStore({
  reducer: {
    session: sessionReducer,
  },
});

// Infer the RootState and AppDispatch types.
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
