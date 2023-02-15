import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

test('renders page', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: 'Pupíci' })).toHaveTextContent(
    /Pupíci/,
  );
  expect(screen.getByRole('textbox')).toBeEnabled();
  expect(screen.getByRole('textbox')).toHaveAccessibleName('Hledat');
});

test('search and display dog image results', () => {
  render(<App />);
  const input = screen.getByRole('textbox');
  userEvent.type(input, 'rad');
  expect(input).toHaveValue('rad');
  expect(screen.getByRole('img', { name: 'Rado' })).toBeInTheDocument();
  expect(screen.getByRole('img', { name: 'Radon' })).toBeInTheDocument();
  expect(screen.getByRole('img', { name: 'Rada' })).toBeInTheDocument();
  expect(screen.getByRole('img', { name: 'Radi' })).toBeInTheDocument();
});
