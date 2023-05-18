import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import {  TodoProvider } from "./TodoContext";
import { mockTodos } from "../hooks/useMockTodoContext";
import useTodoContext from "../hooks/useTodoContext";

const newTodoValue = "add new todo";

describe("TodoProvider Test", () => {
  
  const TestComponent = () => {
    const {Todos, addTodo, deleteTodo} = useTodoContext();

    return (
      <>
        <button 
          data-testid="addTodo"
          onClick={() => addTodo(newTodoValue)}
        > add Todo Button </button>
        
        {Todos.map(todo => (
          <div key={todo.id}>
            {todo.value}
            <div 
              data-testid="deleteTodo"
              onClick={() => deleteTodo(todo.id)}
            > delete Todo Button</div>
        </div>
        ))}
      </>
    );
  }

  const setup = () => {
    render(<TodoProvider init={mockTodos}><TestComponent/></TodoProvider>);
  }

  it("addTodo 확인, newTodoValue 추가 되는지", async () => {
    setup();

    const addButton = screen.getByTestId("addTodo")
    await userEvent.click(addButton);
    expect(screen.getByText(newTodoValue)).toBeInTheDocument();
  });

  it("deleteTodo 확인, 리스트중 첫번째 todo 지워지는지", async () => {
    setup();

    const deleteButton = screen.getAllByTestId("deleteTodo")[0];
    await userEvent.click(deleteButton);
    expect(screen.queryByText(mockTodos[0].value)).not.toBeInTheDocument();
  });
});