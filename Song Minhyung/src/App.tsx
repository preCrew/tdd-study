import TodoApp from './Todo/TodoApp';
import { TodoProvider } from './context/TodoContext';

function App() {
  return (
    <>
      <TodoProvider>
        <TodoApp />
      </TodoProvider>
    </>
  );
}

export default App;
