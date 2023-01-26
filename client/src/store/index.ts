import authSlice from "./auth/authSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
   reducer: {
      auth: authSlice,
   },
});

export type RootState = ReturnType<typeof store.getState>;
export type Dispatch = typeof store.dispatch;