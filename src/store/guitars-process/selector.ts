import { State } from '../../types/state';
import { NameSpace } from '../../consts';

export const getPageCurrent = (state: State):string =>
  state[NameSpace.Process].pageCurrent;
