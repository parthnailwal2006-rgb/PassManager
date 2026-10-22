
import { createSlice } from "@reduxjs/toolkit";

const storedCount = localStorage.getItem("localvault_count");
const storedToken = localStorage.getItem("localvault_token");

const initialState = {
  token: storedToken || null,
  count: storedCount ? JSON.parse(storedCount) : 0,
  isAuthenticated: !!storedToken,
  isLoading: false,
  error: null,
};

export const AuthSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    addtostorage: (state, action) => {
      const { localvault_token, localvault_count } = action.payload;

      if (!localvault_token || !Number.isInteger(localvault_count) ||
          localvault_count < 0) {
        state.error = "Invalid login response";
        return;
      }

      state.token = localvault_token;
      state.count = localvault_count;
      state.isAuthenticated = true;
      state.error = null;

      localStorage.setItem("localvault_token", state.token);
      localStorage.setItem(
        "localvault_count",
        JSON.stringify(state.count)
      );
    },

    setCount: (state, action) => {
      state.count = action.payload;

      localStorage.setItem(
        "localvault_count",
        JSON.stringify(state.count)
      );
    },

    removestorage: (state) => {
      localStorage.removeItem("localvault_token");
      localStorage.removeItem("localvault_count");
      localStorage.removeItem("localvault_user");

      state.token = null;
      state.count = 0;
      state.isAuthenticated = false;
      state.error = null;
    },
  },
});

export const { addtostorage, setCount, removestorage } =
  AuthSlice.actions;

export default AuthSlice.reducer;
