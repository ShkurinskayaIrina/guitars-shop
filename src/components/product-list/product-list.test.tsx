import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-router/history-router';
import ProductList from './product-list';
import { makeFakeGuitar } from '../../utils/mocks';

describe('Компонент: "ProductList"', () => {
  it('корректно отрисовывается компонент', () => {
    const history = createMemoryHistory();
    const mockCatalog = new Array(1).fill(null).map(()=>(makeFakeGuitar()));

    render(
      <HistoryRouter history={history}>
        <ProductList catalog={mockCatalog}/>
      </HistoryRouter>,
    );

    expect(screen.getByTestId('catalog__cards')).toBeInTheDocument();
  });
});
