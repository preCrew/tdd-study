import { screen } from "@testing-library/react"
import TodoList from "./TodoList";
import { mockTodos } from "../mocks/todo";
import renderWithRecoil from "../recoil/renderWithRecoil";

describe('<TodoList/>', () => {

  it('render with todos', () => {
    renderWithRecoil(<TodoList/>);

    expect(screen.getByText(mockTodos[0].value)).toBeInTheDocument();
    expect(screen.getByText(mockTodos[1].value)).toBeInTheDocument();
  });
})