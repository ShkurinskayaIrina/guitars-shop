import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import HistoryRouter from '../history-router/history-router';
import { makeFakeGuitar, makeFakeComment } from '../../utils/mocks';
import Catalog from './catalog';

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

describe('Компонент: "Catalog"', () => {
  it('корректно отрисовывается компонент', () => {
    const history = createMemoryHistory();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Catalog />
        </HistoryRouter>,
      </Provider>,
    );
    expect(screen.getByTestId('catalog')).toBeInTheDocument();
  });
});
