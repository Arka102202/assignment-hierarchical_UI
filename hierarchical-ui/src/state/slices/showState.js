import { createSlice } from "@reduxjs/toolkit"

const showStateSlice = createSlice({
  name: "showState",
  initialState: {
    showDept: false,
    showTeam: [],
    showMember: []
  },
  reducers: {
    updateShowDept(state, action) {
      state.showDept = action.payload;
    },
    updateShowTeam(state, action) {
      state.showTeam = action.payload;
    },
    toggleShowDept(state) {
      state.showDept = !state.showDept;
    },
    toggleShowTeam(state, action) {
      const index = state.showTeam.indexOf(action.payload);
      if (index === -1) state.showTeam.push(action.payload);
      else state.showTeam.splice(index, 1);
    },
    toggleShowMember(state, action) {
      const index = state.showMember.indexOf(action.payload);
      if (index === -1) state.showMember.push(action.payload);
      else state.showMember.splice(index, 1);
    }
  }
})

export const showStateReducer = showStateSlice.reducer;

export const updateShowDept = showStateSlice.actions.updateShowDept;
export const updateShowTeam = showStateSlice.actions.updateShowTeam;
export const toggleShowDept = showStateSlice.actions.toggleShowDept;
export const toggleShowTeam = showStateSlice.actions.toggleShowTeam;
export const toggleShowMember = showStateSlice.actions.toggleShowMember;