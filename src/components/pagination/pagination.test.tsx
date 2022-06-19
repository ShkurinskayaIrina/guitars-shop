import {render, screen} from '@testing-library/react';
import {Routes, Route} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import userEvent from '@testing-library/user-event';
import * as Redux from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import HistoryRouter from '../history-router/history-router';
import Pagination from './pagination';
import {AppRoute, NameSpace } from '../../consts';

const mockStore = configureMockStore();
const history = createMemoryHistory();
const store = mockStore({});

const pagesCount = 3;
describe('Компонент: Pagination', () => {
  it('корректно отрисовывается компонент при pageCurrent = 1', () => {
    const pageCurrent = 1;

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={AppRoute.Root}
              element={<Pagination pageCurrent={pageCurrent} pagesCount={pagesCount} />}
            />
          </Routes>
        </HistoryRouter>
      </Provider>);

    expect(screen.queryByText(/Назад/i)).not.toBeInTheDocument();
    expect(screen.getByText(`${pageCurrent}`)).toBeInTheDocument();
    expect(screen.getByText(/Далее/i)).toBeInTheDocument();
  });
  it('корректно отрисовывается компонент при pageCurrent = 2', () => {
    const pageCurrent = 2;

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={AppRoute.Root}
              element={<Pagination pageCurrent={pageCurrent} pagesCount={pagesCount} />}
            />
          </Routes>
        </HistoryRouter>
      </Provider>);

    expect(screen.getByText(/Назад/i)).toBeInTheDocument();
    expect(screen.getByText(`${pageCurrent}`)).toBeInTheDocument();
    expect(screen.getByText(/Далее/i)).toBeInTheDocument();
  });

  it('корректно отрисовывается компонент при pageCurrent = 3', () => {
    const pageCurrent = 3;

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={AppRoute.Root}
              element={<Pagination pageCurrent={pageCurrent} pagesCount={pagesCount} />}
            />
          </Routes>
        </HistoryRouter>
      </Provider>);

    expect(screen.getByText(/Назад/i)).toBeInTheDocument();
    expect(screen.getByText(`${pageCurrent}`)).toBeInTheDocument();
    expect(screen.queryByText(/Далее/i)).not.toBeInTheDocument();
  });

  it('хук "useDispatch" действительно был вызван', () => {
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);

    const pageCurrent = 3;

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={AppRoute.Root}
              element={<Pagination pageCurrent={pageCurrent} pagesCount={pagesCount} />}
            />
            <Route
              path={`/catalog/${pageCurrent-1}`}
              element={<h1>Предыдущая страница</h1>}
            />
          </Routes>
        </HistoryRouter>
      </Provider>);

    userEvent.click(screen.getByRole('link',{name: /Назад/i}));
    expect(useDispatch).toBeCalledTimes(1);
    expect(dispatch).nthCalledWith(1, {
      'payload': 2,
      type: `${NameSpace.Process}/choosePage`,
    });
  });

});

