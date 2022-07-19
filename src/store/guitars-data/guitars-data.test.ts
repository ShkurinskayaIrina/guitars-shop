import { guitarsData, initialState } from './guitars-data';
import { loadCatalog, loadGuitar, loadCatalogPriceRange, loadComments } from './guitars-data';
import { makeFakeGuitar, makeFakeComment } from '../../utils/mocks';
import { Comments } from '../../types/guitars';

describe('Reducers: guitarsData', () => {
  const mockGuitar = makeFakeGuitar();
  const mockCatalog = new Array(2).fill(null).map(()=>(mockGuitar));
  const priceMin = mockCatalog[0].price;
  const priceMax = mockCatalog[1].price;

  const id = mockGuitar.id;
  const data: Comments = new Array(1).fill(null).map(() => (makeFakeComment()));

  it('без дополнительных параметров вернет начальное состояние', ()=> {
    expect(guitarsData.reducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual(initialState);
  });

  it ('обновит guitarsCatalog при загрузке каталога', () => {
    expect(guitarsData.reducer(initialState, loadCatalog(mockCatalog)))
      .toEqual({
        ...initialState,
        guitarsCatalog: mockCatalog,
      });
  });

  it ('обновит guitarCurrent при выборе гитары', () => {
    expect(guitarsData.reducer(initialState, loadGuitar(mockGuitar)))
      .toEqual({
        ...initialState,
        guitarCurrent: mockGuitar,
      });
  });

  it ('обновит guitarsComments при загрузке комментариев', () => {
    expect(guitarsData.reducer(initialState, loadComments({id, data})))
      .toEqual({
        ...initialState,
        guitarsComments: {[id]: data },
      });
  });

  it ('обновит catalogSortingByPrice при загрузке min и max цен каталога', () => {
    expect(guitarsData.reducer(initialState, loadCatalogPriceRange({priceMin, priceMax})))
      .toEqual({
        ...initialState,
        guitarsPriceRange: {
          priceMin: priceMin,
          priceMax: priceMax,
        },
      });
  });
});
