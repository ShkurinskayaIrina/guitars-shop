import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {Routes, Route} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../history-router/history-router';
import Breadcrumbs from './breadcrumbs';

const history = createMemoryHistory();

describe('Component: "Breadcrumbs"', () => {
  it('корректно отрисовывается компонент', () => {
    render(
      <HistoryRouter history={history}>
        <Breadcrumbs nameGuitar={'fake name'} />
      </HistoryRouter>);

    expect(screen.getByText(/Главная/i)).toBeInTheDocument();
    expect(screen.getByText(/Каталог/i)).toBeInTheDocument();
    expect(screen.getByText(/fake name/i)).toBeInTheDocument();
    expect(screen.getAllByRole('link').length).toBe(3);
  });

  it('должен перенаправляться на корневой URL-адрес, когда пользователь нажимает на ссылку "Главная"', () => {
    history.push('/fake');

    render(
      <HistoryRouter history={history}>
        <Routes>
          <Route
            path="/"
            element={<h1>Это главная страница</h1>}
          />
          <Route
            path='*'
            element={<Breadcrumbs />}
          />
        </Routes>
      </HistoryRouter>);

    expect(screen.queryByText(/Это главная страница/i)).not.toBeInTheDocument();
    userEvent.click(screen.getByRole('link',{name: /Главная/i}));
    expect(screen.getByText(/Это главная страница/i)).toBeInTheDocument();
  });

  it('должен перенаправляться на первую страницу каталога, когда пользователь нажимает на ссылку "Каталог"', () => {
    history.push('/fake');

    render(
      <HistoryRouter history={history}>
        <Routes>
          <Route
            path={'/catalog/1'}
            element={<h1>Это первая страница каталога</h1>}
          />
          <Route
            path='*'
            element={<Breadcrumbs />}
          />
        </Routes>
      </HistoryRouter>);

    expect(screen.queryByText(/Это первая страница каталога/i)).not.toBeInTheDocument();
    userEvent.click(screen.getByRole('link',{name: /Каталог/i}));
    expect(screen.getByText(/Это первая страница каталога/i)).toBeInTheDocument();
  });
});
