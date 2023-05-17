import { render } from "@testing-library/react";
import { Todo, TodoContext, TodoContextState, TodoProvider } from "../TodoContext";

export const mockTodos:Todo[] = [
  {id: 1, value: 'Test todo'},
  {id: 2, value: 'Test todo2'},
];

const useMockTodoContext = (renderTargetComponent: React.ReactElement<any, string | React.JSXElementConstructor<any>>,) => {
  const mockAddTodo = jest.fn();
  const mockDeleteTodo = jest.fn();
  

  const mockTodoContext: TodoContextState = {
    Todos: mockTodos,
    addTodo: mockAddTodo,
    deleteTodo: mockDeleteTodo,
  };


  const wrapper = ({children}: {children: React.ReactNode}) => (
    <TodoContext.Provider value={mockTodoContext}>{children}</TodoContext.Provider>
  );

  render(renderTargetComponent, {wrapper});

  return {mockDeleteTodo, mockAddTodo, wrapper};
}

export default useMockTodoContext;