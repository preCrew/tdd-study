import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event";
import TodoApp from "./TodoApp"

describe('<TodoApp/>', () => {

  it('todoform, todolist render', () => {
    render(<TodoApp/>)
    screen.getByTestId('TodoFormButton')
    screen.getByTestId('TodoList');
  });

  it('new todo', async() => {
    render(<TodoApp/>)
    const input = screen.getByTestId("TodoFormInput");
    const button = screen.getByTestId("TodoFormButton");
    const todoList = screen.getByTestId("TodoList");

    await userEvent.type(input, "new todo");
    await userEvent.click(button);
    
    expect(todoList).toHaveTextContent("new todo");
  });
});