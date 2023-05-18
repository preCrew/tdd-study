import {  screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import TodoItem from "./TodoItem"
import { Todo } from "../context/TodoContext";
import useMockTodoContext from "../hooks/useMockTodoContext";


describe('<TodoItem/>', () => {
  const mockItem: Todo = {
    id: 1, value: 'Test todo',
  };

  const useSetup = () => {
    const {
      mockAddTodo, mockDeleteTodo,
    } = useMockTodoContext(<TodoItem item={mockItem} />);

    const deleteButton = screen.getByTestId("DeleteButton");
    const span = screen.getByText(mockItem.value);

    return { mockAddTodo, mockDeleteTodo, deleteButton, span };
  }

  it('has span & button', () => {
    const { span, deleteButton } = useSetup();
    expect(span).toBeInTheDocument();
    expect(deleteButton).toBeInTheDocument();
  });

  it('onClickDeleteButton with item\'s id', async () => {
    const { deleteButton, mockDeleteTodo } = useSetup();
    await userEvent.click(deleteButton);
    expect(mockDeleteTodo).toBeCalledWith(mockItem.id);
  });
});