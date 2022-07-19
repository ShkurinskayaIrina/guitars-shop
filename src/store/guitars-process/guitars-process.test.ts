import { guitarsProcess, initialState } from './guitars-process';
import { choosePage, updateFilterPrice, updateFilterTypes,
  updateFilter4Strings, updateFilter6Strings, updateFilter7Strings, updateFilter12Strings,
  updateSortType, updateSortOrder } from './guitars-process';
import { makeFakeNumberPage } from '../../utils/mocks';
import { SortType, SortOrder } from '../../consts';

describe('Reducers guitarsProcess', () => {
  it ('без дополнительных параметров вернет начальное состояние', () => {
    expect(guitarsProcess.reducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual({
        ...initialState,
        pageCurrent: '1',
      });
  });

  it ('вернет номер нажатой страницы', () => {
    const mockNumberPage = makeFakeNumberPage();
    expect(guitarsProcess.reducer(initialState, choosePage(mockNumberPage)))
      .toEqual({
        ...initialState,
        pageCurrent: mockNumberPage,
      });
  });

  it ('вернет данные для фильтрации по цене', () => {
    const mockFilterPrice = {
      priceMin: 2000,
      priceMax: 5000,
    };
    expect(guitarsProcess.reducer(initialState, updateFilterPrice(mockFilterPrice)))
      .toEqual({
        ...initialState,
        filterPrice: mockFilterPrice,
      });
  });


  it ('вернет данные для фильтрации по типу гитары', () => {
    const mockFilterTypes = {
      acoustic: false,
      electric: false,
      ukulele: true,
    };

    expect(guitarsProcess.reducer(initialState, updateFilterTypes(mockFilterTypes)))
      .toEqual({
        ...initialState,
        filterTypes: mockFilterTypes,
      });
  });

  it ('вернет данные для фильтрации по количеству струн (4 шт)', () => {
    expect(guitarsProcess.reducer(initialState, updateFilter4Strings(true)))
      .toEqual({
        ...initialState,
        filter4Strings: true,
      });
  });

  it ('вернет данные для фильтрации по количеству струн (6 шт)', () => {
    expect(guitarsProcess.reducer(initialState, updateFilter6Strings(true)))
      .toEqual({
        ...initialState,
        filter6Strings: true,
      });
  });

  it ('вернет данные для фильтрации по количеству струн (7 шт)', () => {
    expect(guitarsProcess.reducer(initialState, updateFilter7Strings(true)))
      .toEqual({
        ...initialState,
        filter7Strings: true,
      });
  });

  it ('вернет данные для фильтрации по количеству струн (12 шт)', () => {
    expect(guitarsProcess.reducer(initialState, updateFilter12Strings(true)))
      .toEqual({
        ...initialState,
        filter12Strings: true,
      });
  });

  it ('вернет данные для типа сортировки', () => {
    expect(guitarsProcess.reducer(initialState, updateSortType(SortType.Popularity)))
      .toEqual({
        ...initialState,
        sortType: SortType.Popularity,
      });
  });

  it ('вернет данные для сортировки по возрастанию или убыванию', () => {
    expect(guitarsProcess.reducer(initialState, updateSortOrder(SortOrder.Up)))
      .toEqual({
        ...initialState,
        sortOrder: SortOrder.Up,
      });
  });
});


