import {render, screen } from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import HistoryRouter from '../history-route/history-route';
import ProductPage from './product-page';
import { makeFakeGuitar, makeFakeComment } from '../../utils/mocks';

const mockStore = configureMockStore();
const mockCatalog = new Array(1).fill(null).map(()=>(makeFakeGuitar()));
const mockComments = new Array(1).fill(null).map(()=>(makeFakeComment()));

const store = mockStore({
  DATA: {
    guitarsCatalog: mockCatalog,
    guitarCurrent: mockCatalog[0],
    guitarComments: mockComments,
  },
  PROCESS: {
    pageCurrent: '1',
  },
});

const history = createMemoryHistory();

describe('Компонент: ProductPage', () => {
  it('корректно отрисовывается компонент', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ProductPage />
        </HistoryRouter>
      </Provider>);

    expect(screen.getByTestId('name')).toBeInTheDocument();
    expect(screen.getByText(/Цена/i)).toBeInTheDocument();
    expect(screen.getByText(/Добавить в корзину/i)).toBeInTheDocument();
  });

});
