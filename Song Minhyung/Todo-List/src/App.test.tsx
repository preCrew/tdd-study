import { screen } from '@testing-library/react';
import App from './App';
import renderWithRecoil from './recoil/renderWithRecoil';

test('ui 최초 렌더링 확인', () => {
  renderWithRecoil(<App/>);
  screen.getByTestId('TodoApp')
});