import { render as renderComponent } from "@testing-library/react";
import { Todo, TodoContext, TodoContextState } from "../TodoContext";

export const mockTodos:Todo[] = [
  {id: 1, value: 'Test todo'},
  {id: 2, value: 'Test todo2'},
];

const useMockTodoContext = (renderTargetComponent: React.ReactElement<any, string | React.JSXElementConstructor<any>>,) => {
  let mockTodos:Todo[] = [
    {id: 1, value: 'Test todo'},
    {id: 2, value: 'Test todo2'},
  ];

  // let nextId = 3;

  // const mockAddTodo = jest.fn((value: string) => {
  //   mockTodos = [...mockTodos, {id: nextId++, value}];
  // });

  // const mockDeleteTodo = jest.fn((id: number) => {
  //   mockTodos = mockTodos.filter(mockTodo => mockTodo.id !== id);
  // });
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

  renderComponent(renderTargetComponent, {wrapper});

  return {mockTodos, mockDeleteTodo, mockAddTodo, wrapper};
}

export default useMockTodoContext;