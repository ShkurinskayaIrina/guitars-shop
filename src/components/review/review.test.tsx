import {render, screen } from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import HistoryRouter from '../history-router/history-router';
import { makeFakeGuitar, makeFakeComment } from '../../utils/mocks';
import { SortType, SortOrder } from '../../consts';
import { Comments } from '../../types/guitars';

import Review from './review';

const mockStore = configureMockStore();
const mockGuitar = makeFakeGuitar();

const mockCatalog = new Array(1).fill(null).map(()=>(mockGuitar));
const mockComment = makeFakeComment();

const id = mockGuitar.id;
const data: Comments = new Array(1).fill(null).map(() => (makeFakeComment()));

const store = mockStore({
  DATA: {
    guitarsCatalog: mockCatalog,
    guitarCurrent: mockGuitar,
    guitarComments: {[id]: data},
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

describe('Компонент: Review', () => {
  it('корректно отрисовывается компонент', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Review commentForRender={mockComment}/>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Достоинства/i)).toBeInTheDocument();
    expect(screen.getByText(/Недостатки/i)).toBeInTheDocument();
    expect(screen.getByText(/Комментарий/i)).toBeInTheDocument();
  });
});
