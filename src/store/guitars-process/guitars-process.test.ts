import { guitarsProcess } from './guitars-process';
import { choosePage } from './guitars-process';
import { makeFakeNumberPage } from '../../utils/mocks';

describe('Reducers guitarsProcess', () => {
  it ('без дополнительных параметров вернет начальное состояние', () => {
    expect(guitarsProcess.reducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual({pageCurrent: '1'});
  });

  it ('вернет номер нажатой страницы', () => {
    const state = {pageCurrent: '1'};
    const mockNumberPage = makeFakeNumberPage();
    expect(guitarsProcess.reducer(state, choosePage(mockNumberPage)))
      .toEqual({pageCurrent: mockNumberPage});
  });
});


