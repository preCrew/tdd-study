import { render, screen } from '@testing-library/react';
import App from '../../TodoList/src/App';
import { RecoilRoot } from 'recoil';
import TodoApp from './TodoApp';

describe('TodoApp', () => {
  it('should render without errors', () => {
    render(
      <RecoilRoot>
        <App />
      </RecoilRoot>
    );

    // 테스트 코드 작성
  });
});

