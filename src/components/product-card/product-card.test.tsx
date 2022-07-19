import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import HistoryRouter from '../history-router/history-router';
import { makeFakeGuitar, makeFakeComment } from '../../utils/mocks';
import { SortType, SortOrder } from '../../consts';
import { Comments } from '../../types/guitars';

import ProductCard from './product-card';

const mockStore = configureMockStore();

const history = createMemoryHistory();

const mockGuitar = makeFakeGuitar();
const mockCatalog = new Array(2).fill(null).map(()=>(mockGuitar));

const id = mockGuitar.id;
const data: Comments = new Array(1).fill(null).map(() => (makeFakeComment()));

const store = mockStore({
  DATA: {
    guitarsCatalog: mockCatalog,
    guitarCurrent: mockGuitar,
    guitarComments: {[id]: data },
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

describe('Компонент: ProductCard', () => {
  it('корректно отрисовывается компонент', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ProductCard guitar={mockGuitar} />
        </HistoryRouter>
      </Provider>);

    expect(screen.getByText(`${mockGuitar.name} ${mockGuitar.type[0].toUpperCase()}${mockGuitar.type.substring(1)}`)).toBeInTheDocument();
    expect(screen.getByText(/Цена/i)).toBeInTheDocument();
    expect(screen.getByText(/Подробнее/i)).toBeInTheDocument();
    expect(screen.getByText(/Купить/i)).toBeInTheDocument();
  });

});
