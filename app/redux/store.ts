// store.ts
import { configureStore } from "@reduxjs/toolkit";
import sessionID from "./sessionIdSlice";

export const store = configureStore({
  reducer: {
    sessionData: sessionID,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
