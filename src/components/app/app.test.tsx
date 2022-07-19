import {render, screen } from '@testing-library/react';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import HistoryRouter from '../history-router/history-router';
import App from './app';
import { AppRoute } from '../../consts';
import { makeFakeGuitar, makeFakeComment } from '../../utils/mocks';

const mockStore = configureMockStore();

const mockGuitar = makeFakeGuitar();
const mockGuitarId = mockGuitar.id;
const mockCatalog = new Array(1).fill(null).map(()=>(mockGuitar));
const mockComments = new Array(1).fill(null).map(()=>(makeFakeComment()));

const store = mockStore({
  DATA: {
    guitarsCatalog: mockCatalog,
    guitarCurrent: mockCatalog[0],
    guitarComments: {[mockGuitarId]: mockComments},
    guitarsPriceRange: {
      priceMin: 0,
      priceMax: 0,
    },
  },
  PROCESS: {
    pageCurrent: '1',
  },
});

const history = createMemoryHistory();

const fakeApp = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <App />
    </HistoryRouter>
  </Provider>
);

describe('Маршрутизация', () => {
  it('должна отображаться "MainPage", когда пользователь переходит "/"', async () => {
    history.push(AppRoute.Root);
    render(fakeApp);

    expect(screen.getByText(/Каталог гитар/i)).toBeInTheDocument();
  });

  it('должна отображаться "MainPage", когда пользователь переходит в каталог', async () => {
    history.push('/catalog/1');
    render(fakeApp);
    expect(screen.getByText(/Каталог гитар/i)).toBeInTheDocument();
  });

  it('должна отображаться "ProductPage", когда пользователь переходит на страницу продукта', async () => {
    history.push('/catalog/guitar/1');
    render(fakeApp);

    expect(screen.getByTestId('name')).toBeInTheDocument();
  });

  it('должна отображаться "NotFoundPage", когда пользователь переходит по несуществующему маршруту', async () => {
    history.push('/non-existent-route');

    render(fakeApp);

    expect(screen.getByText('404 :( Такой страницы не существует')).toBeInTheDocument();
    expect(screen.getByText('Главная')).toBeInTheDocument();
    expect(screen.getByText('Несуществующая страница')).toBeInTheDocument();
  });
});
