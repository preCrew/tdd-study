import { screen } from "@testing-library/react"
import TodoList from "./TodoList"
import useMockTodoContext, { mockTodos } from "./hooks/useMockTodoContext"

describe('<TodoList/>', () => {

  it('render with todos', () => {
    useMockTodoContext(<TodoList todoItems={mockTodos}/>);

    expect(screen.getByText(mockTodos[0].value)).toBeInTheDocument();
    expect(screen.getByText(mockTodos[1].value)).toBeInTheDocument();
  });
})