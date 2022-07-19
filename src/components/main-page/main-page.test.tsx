import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import HistoryRouter from '../history-router/history-router';
import {AppRoute} from '../../consts';
import { makeFakeGuitar, makeFakeComment } from '../../utils/mocks';
import { SortType, SortOrder } from '../../consts';

import MainPage from './main-page';

const mockStore = configureMockStore();

const mockGuitar = makeFakeGuitar();
const mockGuitarId = mockGuitar.id;
const mockCatalog = new Array(1).fill(null).map(()=>(mockGuitar));
const mockComments = new Array(1).fill(null).map(()=>(makeFakeComment()));

const store = mockStore({
  DATA: {
    guitarsCatalog: mockCatalog,
    guitarCurrent: mockCatalog[0],
    guitarComments: {[mockGuitarId]: mockComments},
    guitarsPriceRange: {
      priceMin: 0,
      priceMax: 0,
    },
  },
  PROCESS: {
    pageCurrent: '1',
    filterPrice: {
      priceMin: 0,
      priceMax: 0,
    },

    filterTypes: {
      acoustic: false,
      electric: false,
      ukulele: false,
    },

    filter4Strings: false,
    filter6Strings: false,
    filter7Strings: false,
    filter12Strings: false,

    sortType: SortType.Original,
    sortOrder: SortOrder.Original,
  },
});

const history = createMemoryHistory();

describe('Component: MainPage', () => {
  it('корректно отрисовывается компонент', () => {
    history.push(AppRoute.Root);

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <MainPage />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Каталог гитар/i)).toBeInTheDocument();
    expect(screen.getByText('Главная')).toBeInTheDocument();
    expect(screen.getByText(/Фильтр/i)).toBeInTheDocument();
  });


});
