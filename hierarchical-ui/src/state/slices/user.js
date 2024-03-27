import { createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoggedIn: JSON.parse(localStorage.getItem("isLoggedIn")),
    user: JSON.parse(localStorage.getItem("user")),
  },
  reducers: {
    updateCredential(state, action) {
      state = { ...action.payload };
      localStorage.setItem("isLoggedIn", JSON.stringify(action.payload.isLoggedIn))
      localStorage.setItem("user", JSON.stringify(action.payload.user))
    },

    updateUser(state, action) {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload))
    },

    updateIsLoggedIn(state, action) {
      state.isLoggedIn = action.payload;
      localStorage.setItem("isLoggedIn", JSON.stringify(action.payload))
    },
  }
})

export const userReducer = userSlice.reducer;

export const updateCredential = userSlice.actions.updateCredential;
export const updateUser = userSlice.actions.updateUser;
export const updateIsLoggedIn = userSlice.actions.updateIsLoggedIn;