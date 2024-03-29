import { createSlice } from "@reduxjs/toolkit"

const deptSlice = createSlice({
  name: "dept",
  initialState: {
    depts: []
  },
  reducers: {
    add(state, action) {
      state.depts.push(action.payload)
    },
    addMultiple(state, action) {
      action.payload.forEach(el => state.depts.push(el));
    },
    replaceMultiple(state, action) {
      state.depts = action.payload;
    },
    replaceOne(state, action) {
      state.depts.splice(action.payload.idx, 1, action.payload.data);
    },
  }
})

export const deptReducer = deptSlice.reducer;

export const addDept = deptSlice.actions.add;
export const addMultipleDept = deptSlice.actions.addMultiple;
export const replaceMultipleDept = deptSlice.actions.replaceMultiple;
export const replaceOneDept = deptSlice.actions.replaceOne;