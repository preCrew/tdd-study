import useTodoContext from '../hooks/useTodoContext';
import TodoForm from './TodoForm';
import TodoList from './TodoList';

const TodoApp = () => {
  const {Todos, addTodo} = useTodoContext();

  const handleOnSubmit = (value: string) => {
    addTodo(value);
  }
  return (
    <div data-testid="TodoApp">
      <TodoForm onSubmit={handleOnSubmit}/>
      <TodoList 
        data-testid="TodoList" 
        todoItems={Todos}
      />
    </div>
  );
};

export default TodoApp;