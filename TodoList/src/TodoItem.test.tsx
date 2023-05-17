import { fireEvent, render, screen } from "@testing-library/react"
import TodoItem from "./TodoItem"

describe('<TodoItem/>', () => {
  const mockItem = "this is a item";
  const onDelete = jest.fn();

  it('has span', () => {
    render(<TodoItem item={mockItem} onDelete={onDelete}/>)

    const span = screen.getByText(mockItem)
    expect(span).toBeTruthy();
  })

})

