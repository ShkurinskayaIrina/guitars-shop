import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../consts';
import { GuitarsData } from '../../types/state';
import { Guitar, Guitars, GuitarsComments } from '../../types/guitars';

export const initialState: GuitarsData = {
  guitarsCatalog: [] as unknown as Guitars,
  guitarCurrent: {} as Guitar,
  guitarsComments: {} as GuitarsComments,
  guitarsPriceRange: {
    priceMin: 0,
    priceMax: 0,
  },
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
      state.guitarsComments = { ...state.guitarsComments, [action.payload.id]: action.payload.data};
    },
    loadCatalogPriceRange: (state, action) => {
      state.guitarsPriceRange.priceMin = action.payload.priceMin;
      state.guitarsPriceRange.priceMax = action.payload.priceMax;
    },
  },
});

export const { loadCatalog, loadGuitar, loadComments, loadCatalogPriceRange } = guitarsData.actions;
