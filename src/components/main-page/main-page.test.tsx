import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import HistoryRouter from '../history-router/history-router';
import {AppRoute} from '../../consts';
import { makeFakeGuitar, makeFakeComment } from '../../utils/mocks';
import MainPage from './main-page';

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

const history = createMemoryHistory();

describe('Component: MainPage', () => {
  it('корректно отрисовываетсяся компонент', () => {
    history.push(AppRoute.Root);

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <MainPage />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Каталог гитар/i)).toBeInTheDocument();
    expect(screen.getByText('Главная')).toBeInTheDocument();
    expect(screen.getByText(/Фильтр/i)).toBeInTheDocument();
  });


});
