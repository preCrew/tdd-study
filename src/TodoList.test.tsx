import { render, screen } from "@testing-library/react"
import TodoList from "./TodoList"

describe('<TodoList/>', () => {
  const todoItems = [
    {id: 1, item: 'item1'},
    {id: 2, item: 'item2'}
  ];

  it('render with todos', () => {
    render(<TodoList todoItems={todoItems}/>);
    expect(screen.getByText(todoItems[0].item)).toBeInTheDocument();
    expect(screen.getByText(todoItems[1].item)).toBeInTheDocument();
  });
})