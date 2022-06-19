import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-router/history-router';
import Footer from './footer';

describe('Компонент: "Footer"', () => {
  it('корректно отрисовывается компонент', () => {
    const history = createMemoryHistory();

    render(
      <HistoryRouter history={history}>
        <Footer />
      </HistoryRouter>,
    );

    expect(screen.getByAltText('Логотип')).toBeInTheDocument();
    expect(screen.getByText(/Магазин гитар, музыкальных инструментов и гитарная мастерская в Санкт-Петербурге./i)).toBeInTheDocument();
    expect(screen.getByText(/Все инструменты проверены, отстроены и доведены до идеала!/i)).toBeInTheDocument();
    expect(screen.getByText(/Информация/i)).toBeInTheDocument();
    expect(screen.getAllByRole('link').length).toBe(10);

    expect(screen.getByText(/Контакты/i)).toBeInTheDocument();
    expect(screen.getByText(/Режим работы:/i)).toBeInTheDocument();
  });
});
