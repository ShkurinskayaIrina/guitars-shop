import { State } from '../../types/state';
import { NameSpace } from '../../consts';
import { Guitar, Guitars } from '../../types/guitars';

export const getCatalog = (state: State): Guitars => state[NameSpace.Data].guitarsCatalog;

export const getGuitarCurrent = (state: State): Guitar => state[NameSpace.Data].guitarCurrent;

export const getGuitarComments = (state: State) => state[NameSpace.Data].guitarsComments;

export const getGuitarsPriceRange = (state: State) => state[NameSpace.Data].guitarsPriceRange;


