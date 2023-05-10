import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { act } from 'react-dom/test-utils';

test('ui 최초 렌더링 확인', () => {
  render(<App />);
  const inputButton = screen.getByText(/입력 해주세요/i);

  // expect(linkElement).toBeInTheDocument();
});

it('sfs', () => {
  
})