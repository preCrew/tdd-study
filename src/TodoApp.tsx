import { useRef, useState } from 'react';
import TodoForm from './TodoForm';
import TodoList from './TodoList';

const TodoApp = () => {
    const [state, setState] = useState<{id: number, item: string}[]>([]);
    const nextId = useRef(1);

    const handleInsert = (todo: string) => {
      setState(prev => ([...prev, {id: nextId.current++, item: todo}]));
    } 
    return (
        <div data-testid="TodoApp">
          <TodoForm onInsert={handleInsert}/>
          <TodoList data-testid="TodoList" todoItems={state}/>
        </div>
    );
};

export default TodoApp;