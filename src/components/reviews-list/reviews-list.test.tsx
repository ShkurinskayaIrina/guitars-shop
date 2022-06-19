import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import HistoryRouter from '../history-router/history-router';
import ReviewsList from './reviews-list';
import { makeFakeGuitar, makeFakeComment } from '../../utils/mocks';

const history = createMemoryHistory();
const mockStore = configureMockStore();

const mockCatalog = new Array(1).fill(null).map(()=>(makeFakeGuitar()));
const mockComments = new Array(1).fill(null).map(()=>(makeFakeComment()));

const store = mockStore({
  DATA: {
    guitarsCatalog: mockCatalog,
    guitarCurrent: mockCatalog[0],
    guitarComments: mockComments,
  },
  PROCESS: {
    pageCurrent: '1',
  },
});

describe('Компонент: ReviewsList', () => {
  it('корректно отрисовывается компонент', () => {

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ReviewsList guitarId={mockCatalog[0].id.toString()} guitarName={mockCatalog[0].name} />
        </HistoryRouter>
      </Provider>);

    expect(screen.getByText(/Отзывы/i)).toBeInTheDocument();
    expect(screen.getByText(/Оставить отзыв/i)).toBeInTheDocument();
  });

});
