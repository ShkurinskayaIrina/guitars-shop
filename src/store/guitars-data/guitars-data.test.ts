import { guitarsData, initialState } from './guitars-data';
import { loadCatalog, loadGuitar, loadComments } from './guitars-data';
import { makeFakeGuitar, makeFakeComment } from '../../utils/mocks';

describe('Reducers: guitarsData', () => {
  const mockCatalog = new Array(20).fill(null).map(()=>(makeFakeGuitar()));
  const mockGuitar = makeFakeGuitar();
  const mockComments = new Array(20).fill(null).map(() => (makeFakeComment()));

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

  it ('обновит guitarComments при загрузке комментариев', () => {
    expect(guitarsData.reducer(initialState, loadComments(mockComments)))
      .toEqual({
        ...initialState,
        guitarComments: mockComments,
      });
  });
});
