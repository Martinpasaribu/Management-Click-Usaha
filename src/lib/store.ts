// store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import exampleReducer from './slice/slicesA';
import themeReducer from "./slice/themeSlice";
import contactReducer from './slice/contactSlice';

export const store = configureStore({
  reducer: {
    example: exampleReducer,
  contact : contactReducer,
    theme: themeReducer, // tambahkan di sini
  },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;