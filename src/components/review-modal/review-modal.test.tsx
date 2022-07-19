import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';

import HistoryRouter from '../history-router/history-router';
import ReviewModal from './review-modal';

import { makeFakeGuitar, makeFakeComment } from '../../utils/mocks';

const mockStore = configureMockStore();

const mockCatalog = new Array(1).fill(null).map(()=>(makeFakeGuitar()));
const mockComments = new Array(1).fill(null).map(()=>(makeFakeComment()));

const store = mockStore({
  DATA: {
    guitarsCatalog: mockCatalog,
    guitarCurrent: mockCatalog[0],
    guitarComments: {1: mockComments},
  },
});

describe('Component: ReviewModal', () => {

  it('корректно отрисовывается компонент', () => {
    const history = createMemoryHistory();
    history.push('/catalog/guitar/1');
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ReviewModal
            idGuitar={mockCatalog[0].id.toString()}
            guitarName={mockCatalog[0].name}
            onReviewCloseClick={jest.fn()}
            openModalSuccessSubmit={jest.fn()}
          />
        </HistoryRouter>,
      </Provider>,
    );

    expect(screen.getByText(/Ваша Оценка/i)).toBeInTheDocument();

    expect(screen.getByLabelText(/Ваше Имя/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Достоинства/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Недостатки/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Комментарий/i)).toBeInTheDocument();

    expect(screen.getByTestId(/Ужасно/i)).toBeInTheDocument();
    userEvent.type(screen.getByTestId('login'), 'Музыкант');
    userEvent.type(screen.getByTestId('adv'), 'Достоинства');
    userEvent.type(screen.getByTestId('disadv'), 'Недостатки');
    userEvent.type(screen.getByTestId('comment'), 'Комментарий');

    expect(screen.getByDisplayValue(/Музыкант/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/Достоинства/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/Недостатки/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/Комментарий/i)).toBeInTheDocument();
  });

});
