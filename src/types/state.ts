import { Guitar, Guitars, GuitarsComments } from '../types/guitars';
import { SortType, SortOrder } from '../consts';
import { store } from '../store/index.js';

export type GuitarsData = {
  guitarsCatalog: Guitars,
  guitarCurrent: Guitar,
  guitarsComments: GuitarsComments,
  guitarsPriceRange: {
    priceMin: number,
    priceMax: number,
  },
};

export type GuitarsProcess = {
  pageCurrent: string,
  filterPrice: {
    priceMin: number,
    priceMax: number,
  },
  filterTypes: {
    acoustic: boolean,
    electric: boolean,
    ukulele: boolean,
  }
  filter4Strings: boolean,
  filter6Strings: boolean,
  filter7Strings: boolean,
  filter12Strings: boolean,

  sortType: SortType,
  sortOrder: SortOrder,
};

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
