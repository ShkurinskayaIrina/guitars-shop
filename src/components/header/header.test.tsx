import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-router/history-router';
import Header from './header';

describe('Компонент: "Header"', () => {
  it('корректно отрисовывается компонент', () => {
    const history = createMemoryHistory();

    render(
      <HistoryRouter history={history}>
        <Header />
      </HistoryRouter>,
    );

    expect(screen.getByAltText('Логотип')).toBeInTheDocument();
    expect(screen.getAllByRole('link').length).toBe(5);

    expect(screen.getByPlaceholderText('что вы ищите?')).toBeInTheDocument();
  });
});
