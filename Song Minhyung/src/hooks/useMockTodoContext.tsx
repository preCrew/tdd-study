import { render } from "@testing-library/react";
import { Todo, TodoContext, TodoContextState} from "../context/TodoContext";

export const mockTodos:Todo[] = [
  {id: 1, value: 'Test todo1', done: false, modifyMode: false},
  {id: 2, value: 'Test todo2', done: false, modifyMode: false},
];

const useMockTodoContext = (renderTargetComponent: React.ReactElement<any, string | React.JSXElementConstructor<any>>,) => {
  const mockAddTodo = jest.fn();
  const mockDeleteTodo = jest.fn();
  const mockToggleTodo = jest.fn();
  const mockChangeTodo = jest.fn();
  const mockChangeModifyMode = jest.fn();
  

  const mockTodoContext: TodoContextState = {
    Todos: mockTodos,
    addTodo: mockAddTodo,
    deleteTodo: mockDeleteTodo,
    changeTodo: mockChangeTodo,
    toggleTodo: mockToggleTodo,
    changeModifyMode: mockChangeModifyMode,
  };


  const wrapper = ({children}: {children: React.ReactNode}) => (
    <TodoContext.Provider value={mockTodoContext}>{children}</TodoContext.Provider>
  );

  render(renderTargetComponent, {wrapper});

  return {
    mockDeleteTodo, 
    mockAddTodo, 
    mockToggleTodo, 
    mockChangeTodo, 
    mockChangeModifyMode, 
    wrapper
  };
}

export default useMockTodoContext;