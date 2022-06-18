import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../consts';
import { QuestsData } from '../../types/state';
import { Guitar, Guitars, Comments } from '../../types/guitars';

export const initialState: QuestsData = {
  guitarsCatalog: [] as unknown as Guitars,
  guitarCurrent: {} as Guitar,
  guitarComments: [] as Comments,
};

export const guitarsData = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {
    loadCatalog: (state, action) => {
      state.guitarsCatalog = action.payload;
    },
    loadGuitar: (state, action) => {
      state.guitarCurrent = action.payload;
    },
    loadComments: (state, action) => {
      state.guitarComments = action.payload;
    },
  },
});

export const { loadCatalog, loadGuitar, loadComments } = guitarsData.actions;
