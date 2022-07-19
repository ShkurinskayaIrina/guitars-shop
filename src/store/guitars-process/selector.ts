import { State } from '../../types/state';
import { NameSpace } from '../../consts';

export const getPageCurrent = (state: State):string => state[NameSpace.Process].pageCurrent;

export const getFilterPrice = (state: State) => state[NameSpace.Process].filterPrice;

export const getFilterTypes = (state: State) => state[NameSpace.Process].filterTypes;

export const getFilter4Strings = (state: State) => state[NameSpace.Process].filter4Strings;

export const getFilter6Strings = (state: State) => state[NameSpace.Process].filter6Strings;

export const getFilter7Strings = (state: State) => state[NameSpace.Process].filter7Strings;

export const getFilter12Strings = (state: State) => state[NameSpace.Process].filter12Strings;

export const getSortType = (state: State) => state[NameSpace.Process].sortType;

export const getSortOrder = (state: State) => state[NameSpace.Process].sortOrder;

