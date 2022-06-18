import { combineReducers } from '@reduxjs/toolkit';
import { guitarsData } from './guitars-data/guitars-data';
import { guitarsProcess } from './guitars-process/guitars-process';
import { NameSpace } from '../consts';

export const rootReducer = combineReducers({
  [NameSpace.Data]: guitarsData.reducer,
  [NameSpace.Process]: guitarsProcess.reducer,
});
