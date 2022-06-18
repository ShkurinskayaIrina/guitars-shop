import { State } from '../../types/state';
import { NameSpace } from '../../consts';
import { Guitar, Guitars, Comments } from '../../types/guitars';

export const getCatalog = (state: State): Guitars => state[NameSpace.Data].guitarsCatalog;

export const getGuitarCurrent = (state: State): Guitar => state[NameSpace.Data].guitarCurrent;

export const getGuitarComments = (state: State): Comments => state[NameSpace.Data].guitarComments;

