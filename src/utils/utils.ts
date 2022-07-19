import { Guitar } from '../types/guitars';

export const getNumGuitar = (previewImg: string) => {
  let numGuitar;
  if (previewImg!==undefined) {
    numGuitar = parseInt(previewImg.replace(/[^\d]/g, ''), 10);
  }
  return  numGuitar;
};

export const isEscEvent = function (evt: KeyboardEvent) {
  if (evt.key === 'Escape' || evt.key === 'Esc'){
    return evt.key;
  }
};

export const getSortByPrice = (prev:Guitar, next:Guitar) => prev.price - next.price;
