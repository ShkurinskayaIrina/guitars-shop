import { Guitar, Guitars, Comments } from '../types/guitars';
import { store } from '../store/index.js';

export type QuestsData = {
  guitarsCatalog: Guitars,
  guitarCurrent: Guitar,
  guitarComments: Comments,
};

export type QuestsProcess = {
  pageCurrent: string,
};

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
