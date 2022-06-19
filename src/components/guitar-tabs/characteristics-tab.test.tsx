import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-router/history-router';
import CharacteristicsTab from './characteristics-tab';
import { makeFakeGuitar } from '../../utils/mocks';

describe('Компонент: "CharacteristicsTab"', () => {
  it('корректно отрисовывается компонент', () => {
    const history = createMemoryHistory();
    const mockGuitar = makeFakeGuitar();

    render(
      <HistoryRouter history={history}>
        <CharacteristicsTab guitar={mockGuitar}/>
      </HistoryRouter>,
    );

    expect(screen.getByText(/Артикул/i)).toBeInTheDocument();
    expect(screen.getByText(/Тип/i)).toBeInTheDocument();
    expect(screen.getByText(/Количество струн/i)).toBeInTheDocument();
  });
});
