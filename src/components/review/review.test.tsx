import {render, screen } from '@testing-library/react';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../history-route/history-route';
import Review from './review';
import { makeFakeComment } from '../../utils/mocks';

const history = createMemoryHistory();

const mockComments = new Array(1).fill(null).map(()=>(makeFakeComment()));

describe('Компонент: Review', () => {
  it('корректно отрисовывается компонент', () => {
    render(
      <HistoryRouter history={history}>
        <Review commentForRender={mockComments[0]}/>
      </HistoryRouter>,
    );

    expect(screen.getByText(/Достоинства/i)).toBeInTheDocument();
    expect(screen.getByText(/Недостатки/i)).toBeInTheDocument();
    expect(screen.getByText(/Комментарий/i)).toBeInTheDocument();
  });
});
