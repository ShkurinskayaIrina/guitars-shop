import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../consts';
import { QuestsProcess } from '../../types/state';

const initialState: QuestsProcess = {
  pageCurrent: '1',
};

export const guitarsProcess = createSlice({
  name: NameSpace.Process,
  initialState,
  reducers: {
    choosePage: (state, action) => {
      state.pageCurrent = action.payload;
    },
  },
});

export const { choosePage } = guitarsProcess.actions;
