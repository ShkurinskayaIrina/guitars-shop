import {render, screen } from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import HistoryRouter from '../history-router/history-router';
import { makeFakeGuitar, makeFakeComment } from '../../utils/mocks';

import RatingBlock from './rating-block';

const mockStore = configureMockStore();
const history = createMemoryHistory();

const mockCatalog = new Array(1).fill(null).map(()=>(makeFakeGuitar()));
const mockComments = new Array(1).fill(null).map(()=>(makeFakeComment()));

const store = mockStore({
  DATA: {
    guitarsCatalog: mockCatalog,
    guitarCurrent: mockCatalog[0],
    guitarsComments: {1: mockComments},
    guitarsPriceRange: {
      priceMin: 0,
      priceMax: 0,
    },
  },
});

describe('Компонент: RatingBlock', () => {
  it('корректно отрисовывается компонент, если isReview=true', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <RatingBlock id={1} rating={1} width={'15'} height={'15'} isReview/>
        </HistoryRouter>,
      </Provider>,
    );

    expect(screen.getByText(/Оценка/i)).toBeInTheDocument();
    expect(screen.queryByText(/Всего оценок/i)).not.toBeInTheDocument();
  });

  it('корректно отрисовывается компонент, если isReview=false', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <RatingBlock id={2} rating={3} width={'15'} height={'15'} isReview={false}/>
        </HistoryRouter>,
      </Provider>,
    );

    expect(screen.getByText(/Оценка/i)).toBeInTheDocument();
    expect(screen.getByText(/Всего оценок/i)).toBeInTheDocument();
  });
});
