import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./reducer/authSlice";

export const store = configureStore({
  reducer: { auth: authSlice },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
    });
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
