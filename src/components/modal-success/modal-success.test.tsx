import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-router/history-router';
import ModalSuccess from './modal-success';

describe('Компонент: "ModalSuccess"', () => {
  it('корректно отрисовывается компонент', () => {
    const history = createMemoryHistory();

    render(
      <HistoryRouter history={history}>
        <ModalSuccess  closeModalSuccessSubmit={jest.fn()}/>
      </HistoryRouter>,
    );

    expect(screen.getByText(/Спасибо за ваш отзыв!/i)).toBeInTheDocument();
    expect(screen.getAllByTestId('button').length).toBe(2);
  });
});
