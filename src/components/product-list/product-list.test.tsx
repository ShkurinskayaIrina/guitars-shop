import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import {Provider} from 'react-redux';
import HistoryRouter from '../history-router/history-router';
import {configureMockStore} from '@jedmao/redux-mock-store';
import { makeFakeGuitar, makeFakeComment } from '../../utils/mocks';
import { SortType, SortOrder } from '../../consts';

import ProductList from './product-list';

const mockStore = configureMockStore();
const mockGuitar = makeFakeGuitar();
const mockGuitarId = mockGuitar.id;
const mockCatalog = new Array(1).fill(null).map(()=>(mockGuitar));
const mockComments = new Array(1).fill(null).map(()=>(makeFakeComment()));

const store = mockStore({
  DATA: {
    guitarsCatalog: mockCatalog,
    guitarCurrent: mockGuitar,
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

describe('Компонент: "ProductList"', () => {
  it('корректно отрисовывается компонент', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ProductList catalog={mockCatalog}/>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByTestId('catalog__cards')).toBeInTheDocument();
  });
});
