import {configureStore} from '@reduxjs/toolkit';
import { userReducer } from './slices/user';
import { deptReducer } from './slices/dept';
import { showStateReducer } from './slices/showState';
import { teamReducer } from './slices/team';
import { empReducer } from './slices/employee';

export const store = configureStore({
  reducer: {
    userState: userReducer,
    showState: showStateReducer,
    deptState: deptReducer,
    teamState: teamReducer,
    empState: empReducer,
  }
})