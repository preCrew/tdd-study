import { render, screen } from "@testing-library/react"
import TodoItem from "./TodoItem"

describe('<TodoItem/>', () => {
  it('has span & button', () => {
    const mockItem = "this is a item";
    render(<TodoItem item={mockItem}/>)
    expect(screen.getByText(mockItem)).toBeInTheDocument();
  })
})

