import { screen } from "@testing-library/react"
import TodoList from "./TodoList";
import useMockTodoState, { mockTodos } from "../recoil/renderWithRecoil";

describe('<TodoList/>', () => {

  it('render with todos', () => {
    useMockTodoState(<TodoList/>);

    expect(screen.getByText(mockTodos[0].value)).toBeInTheDocument();
    expect(screen.getByText(mockTodos[1].value)).toBeInTheDocument();
  });
})