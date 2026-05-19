import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      const payload = action.payload;
      state.isLoggedIn = true;
      state.user = payload;
    },
    removeAuth: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});

export const { setAuth, removeAuth } = authSlice.actions;
export default authSlice.reducer;
