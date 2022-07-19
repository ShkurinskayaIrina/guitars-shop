import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import HistoryRouter from '../history-router/history-router';
import { makeFakeGuitar, makeFakeComment } from '../../utils/mocks';

import Header from './header';

const mockStore = configureMockStore();
const mockCatalog = new Array(1).fill(null).map(()=>(makeFakeGuitar()));
const mockComments = new Array(1).fill(null).map(()=>(makeFakeComment()));

const store = mockStore({
  DATA: {
    guitarsCatalog: mockCatalog,
    guitarCurrent: mockCatalog[0],
    guitarComments: {1: mockComments},
  },
  PROCESS: {
    pageCurrent: '1',
  },
});

const history = createMemoryHistory();

describe('Компонент: "Header"', () => {
  it('корректно отрисовывается компонент', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Header />
        </HistoryRouter>,
      </Provider>,
    );
    expect(screen.getByAltText('Логотип')).toBeInTheDocument();
    expect(screen.getAllByRole('link').length).toBe(5);

    expect(screen.getByPlaceholderText('что вы ищите?')).toBeInTheDocument();
  });
});
