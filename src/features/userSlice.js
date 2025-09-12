import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: null,
  username: null,
  image: null, // 👈 novo campo
  isAuthenticated: false,
  position: null,
  heading: null,
  score: 0,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.id = action.payload.id;
      state.username = action.payload.username;
      state.image = action.payload.image; // 👈 agora guarda a imagem do BD
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.id = null;
      state.username = null;
      state.image = null; // 👈 limpa também
      state.isAuthenticated = false;
      state.position = null;
      state.heading = null;
      state.score = 0;
    },
    setPosition: (state, action) => {
      state.position = action.payload;
    },
    setHeading: (state, action) => {
      state.heading = action.payload;
    },
    addScore: (state, action) => {
      state.score += action.payload;
    },
  },
});

export const { setUser, logout, setPosition, setHeading, addScore } =
  userSlice.actions;

export default userSlice.reducer;
