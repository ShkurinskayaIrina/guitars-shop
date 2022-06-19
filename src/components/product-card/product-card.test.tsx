import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import HistoryRouter from '../history-router/history-router';
import ProductCard from './product-card';

import { makeFakeGuitar } from '../../utils/mocks';

const mockStore = configureMockStore();

const mockGuitar = makeFakeGuitar();

const history = createMemoryHistory();
const store = mockStore({});

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
