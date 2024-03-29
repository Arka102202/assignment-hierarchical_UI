import { createSlice } from "@reduxjs/toolkit"

const empSlice = createSlice({
  name: "emp",
  initialState: {
    emps:{}
  },
  reducers: {
    add(state, action){
      state.emps.push(action.payload)
    },
    addMultiple(state, action){
      action.payload.forEach(el => state.emps.push(el));
    },
    replaceMultiple(state, action) {
      state.emps[action.payload.key] = action.payload.emps;
    },
  }
})

export const empReducer = empSlice.reducer;

export const addEmp = empSlice.actions.add;
export const addMultipleEmp = empSlice.actions.addMultiple;
export const replaceMultipleEmp = empSlice.actions.replaceMultiple;