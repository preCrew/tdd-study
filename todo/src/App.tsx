import React from 'react'
import { RecoilRoot, useRecoilState } from 'recoil';
import './App.css';
import TodoApp from './TodoApp';

function App() {
  const handleClickButton = () => {

  }

  return (
    
    <TodoApp data-testid="TodoApp"/>
  );
}

export default App;
