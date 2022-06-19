import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-router/history-router';
import DescriptionTab from './description-tab';
import { makeFakeGuitar } from '../../utils/mocks';

const mockGuitar = makeFakeGuitar();
describe('Компонент: "DescriptionTab"', () => {
  it('корректно отрисовывается компонент', () => {
    const history = createMemoryHistory();

    render(
      <HistoryRouter history={history}>
        <DescriptionTab guitarDescription={mockGuitar.description}/>
      </HistoryRouter>,
    );

    expect(screen.getByText(`${mockGuitar.description}`)).toBeInTheDocument();
  });
});
