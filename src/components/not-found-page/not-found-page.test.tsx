import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import HistoryRouter from '../history-router/history-router';
import { makeFakeGuitar, makeFakeComment } from '../../utils/mocks';

import NotFoundPage from './not-found-page';

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

describe('Компонент: "NotFoundPage"', () => {
  it('корректно отрисовывается компонент', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <NotFoundPage />
        </HistoryRouter>
      </Provider>);

    expect(screen.getByText('404 :( Такой страницы не существует')).toBeInTheDocument();
    expect(screen.getByText('Главная')).toBeInTheDocument();
    expect(screen.getByText('Несуществующая страница')).toBeInTheDocument();
  });
});
