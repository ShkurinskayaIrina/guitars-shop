import {render, screen } from '@testing-library/react';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../history-router/history-router';
import RatingBlock from './rating-block';

const history = createMemoryHistory();

describe('Компонент: RatingBlock', () => {
  it('корректно отрисовывается компонент, если isReview=true', () => {
    render(
      <HistoryRouter history={history}>
        <RatingBlock id={1} rating={1} width={'15'} height={'15'} isReview/>
      </HistoryRouter>,
    );

    expect(screen.getByText(/Оценка/i)).toBeInTheDocument();
    expect(screen.queryByText(/Всего оценок/i)).not.toBeInTheDocument();
  });

  it('корректно отрисовывается компонент, если isReview=false', () => {
    render(
      <HistoryRouter history={history}>
        <RatingBlock id={2} rating={3} width={'15'} height={'15'} isReview={false}/>
      </HistoryRouter>,
    );

    expect(screen.getByText(/Оценка/i)).toBeInTheDocument();
    expect(screen.getByText(/Всего оценок/i)).toBeInTheDocument();
  });
});
