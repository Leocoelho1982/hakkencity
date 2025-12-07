import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import { authApi } from "../features/authApi";

export const store = configureStore({
  reducer: {
    user: userReducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});
