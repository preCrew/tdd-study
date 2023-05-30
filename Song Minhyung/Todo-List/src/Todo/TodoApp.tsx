import useTodoState from '../hooks/useTodoState';
import TodoForm from './TodoForm';
import TodoList from './TodoList';

const TodoApp = () => {
  const {addTodo} = useTodoState();

  const handleOnSubmit = (value: string) => {
    addTodo(value);
  }
  return (
    <div data-testid="TodoApp">
      <TodoForm onSubmit={handleOnSubmit}/>
      <TodoList 
        data-testid="TodoList" 
      />
    </div>
  );
};

export default TodoApp;