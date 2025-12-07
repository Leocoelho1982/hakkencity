import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: null,
  username: null,
  image: null,
  token: null,
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { id, username, image, token } = action.payload;

      state.id = id || null;
      state.username = username || null;
      state.image = image || null;
      state.token = token || null;
      state.isAuthenticated = true;
    },

    logoutUser: (state) => {
      state.id = null;
      state.username = null;
      state.image = null;
      state.token = null;
      state.isAuthenticated = false;

      localStorage.removeItem("hakkenUser");
    },

    restoreUser: (state, action) => {
      const { id, username, image, token } = action.payload;
      state.id = id || null;
      state.username = username || null;
      state.image = image || null;
      state.token = token || null;
      state.isAuthenticated = true;
    },
  },
});

export const { setUser, logoutUser, restoreUser } = userSlice.actions;
export default userSlice.reducer;
