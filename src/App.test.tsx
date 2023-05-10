import { render, screen } from '@testing-library/react';
import App from './App';

test('ui 최초 렌더링 확인', () => {
  render(<App />);
  screen.getByTestId('TodoApp')
});