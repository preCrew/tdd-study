import { useRef, useState } from 'react';
import TodoForm from './TodoForm';
import TodoList from './TodoList';

const TodoApp = () => {
  const [state, setState] = useState<{id: number, item: string}[]>([]);
  const nextId = useRef(1);

  const handleOnSubmit = (todo: string) => {
    setState(prev => ([...prev, {id: nextId.current++, item: todo}]));
  } 
  return (
    <div data-testid="TodoApp">
      <TodoForm onSubmit={handleOnSubmit}/>
      <TodoList data-testid="TodoList" todoItems={state}/>
    </div>
  );
};

export default TodoApp;