import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "counter",
  initialState: {
    token: localStorage.getItem("token") || "",
    setIsLoggedIn: Boolean(localStorage.getItem("token")),
    role: localStorage.getItem("role") || ""
  },
  reducers: {
    setLogin: (state, action) => {
      state.setIsLoggedIn = true;
      state.token = action.payload;
      localStorage.setItem("token", action.payload);
    },
    setLogout: (state) => {
      state.setIsLoggedIn = false;
      state.token = "";
      localStorage.removeItem("token");
      localStorage.removeItem("role");

    },
    setRole: (state,action) => {
      state.role = action.payload
      localStorage.setItem("role", action.payload);

    }
  },
});

// Action creators are generated for each case reducer function
export const { setLogin, setLogout, setRole } = authSlice.actions;

export default authSlice.reducer;
