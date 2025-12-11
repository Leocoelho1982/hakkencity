import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import { authApi } from "../features/authApi";
import { poiApi } from "../features/poiApi";
import { gameApi } from "../features/gameApi";

export const store = configureStore({
  reducer: {
    user: userReducer,
    [authApi.reducerPath]: authApi.reducer,
    [poiApi.reducerPath]: poiApi.reducer,
    [gameApi.reducerPath]: gameApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, poiApi.middleware, gameApi.middleware),
});
