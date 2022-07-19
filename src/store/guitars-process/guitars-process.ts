import { createSlice } from '@reduxjs/toolkit';
import { NameSpace, SortType, SortOrder } from '../../consts';
import { GuitarsProcess } from '../../types/state';

export const initialState: GuitarsProcess = {
  pageCurrent: '1',
  filterPrice: {
    priceMin: 0,
    priceMax: 0,
  },
  filterTypes: {
    acoustic: false,
    electric: false,
    ukulele: false,
  },

  filter4Strings: false,
  filter6Strings: false,
  filter7Strings: false,
  filter12Strings: false,

  sortType: SortType.Original,
  sortOrder: SortOrder.Original,
};

export const guitarsProcess = createSlice({
  name: NameSpace.Process,
  initialState,
  reducers: {
    choosePage: (state, action) => {
      state.pageCurrent = action.payload;
    },
    updateFilterPrice: (state, action) => {
      state.filterPrice = action.payload;
    },
    updateFilterTypes: (state, action) => {
      state.filterTypes = action.payload;
    },
    updateFilter4Strings: (state, action) => {
      state.filter4Strings = action.payload;
    },
    updateFilter6Strings: (state, action) => {
      state.filter6Strings = action.payload;
    },
    updateFilter7Strings: (state, action) => {
      state.filter7Strings = action.payload;
    },
    updateFilter12Strings: (state, action) => {
      state.filter12Strings = action.payload;
    },
    updateSortType: (state, action) => {
      state.sortType = action.payload;
    },
    updateSortOrder: (state, action) => {
      state.sortOrder = action.payload;
    },
  },
});

export const {
  choosePage,
  updateFilterPrice,
  updateFilterTypes,
  updateFilter4Strings,
  updateFilter6Strings,
  updateFilter7Strings,
  updateFilter12Strings,
  updateSortType, updateSortOrder } = guitarsProcess.actions;
