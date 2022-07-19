import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-router/history-router';

import Preloader from './preloader';

const history = createMemoryHistory();

describe('Компонент: "Preloader"', () => {
  it('корректно отрисовывается компонент', () => {
    render(
      <HistoryRouter history={history}>
        <Preloader />
      </HistoryRouter>,
    );

    expect(screen.getByTestId('preloader')).toBeInTheDocument();
  });
});
