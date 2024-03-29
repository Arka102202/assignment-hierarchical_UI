import { createSlice } from "@reduxjs/toolkit"

const teamSlice = createSlice({
  name: "team",
  initialState: {
    teams: {}
  },
  reducers: {
    replaceMultiple(state, action) {
      state.teams[action.payload.key] = action.payload.teams;
    },
  }
})

export const teamReducer = teamSlice.reducer;

export const replaceMultipleTeam = teamSlice.actions.replaceMultiple;