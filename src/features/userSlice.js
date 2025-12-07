import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: null,
  username: null,
  image: null,         // avatar do utilizador
  isAuthenticated: false,
  loading: true,       // 🔥 impede PrivateRoute de redirecionar cedo demais
  position: null,
  heading: null,
  score: 0,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // 🔥 Chamado quando o backend retorna /me com sucesso
    setUser: (state, action) => {
      state.id = action.payload.id;
      state.username = action.payload.username;
      state.image = action.payload.image || null;
      state.isAuthenticated = true;
      state.loading = false;     // sessão restaurada
    },

    // 🔥 Chamado quando falha /me ou logout
    logout: (state) => {
      state.id = null;
      state.username = null;
      state.image = null;
      state.isAuthenticated = false;
      state.loading = false;     // para o PrivateRoute saber que terminou
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

export const {
  setUser,
  logout,
  setPosition,
  setHeading,
  addScore,
} = userSlice.actions;

export default userSlice.reducer;
