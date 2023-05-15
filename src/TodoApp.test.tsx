import { screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event";
import TodoApp from "./TodoApp"
import useMockTodoContext from "./hooks/useMockTodoContext";

describe('<TodoApp/>', () => {

  const useSetup = () => {
    const {
      mockTodos, mockAddTodo, mockDeleteTodo
    } = useMockTodoContext(<TodoApp/>);

    const input = screen.getByTestId("TodoFormInput");
    const submitButton = screen.getByTestId('TodoFormButton')
    const todoList = screen.getByTestId('TodoList');

    return {
      mockTodos, mockAddTodo, mockDeleteTodo, 
      input, submitButton, todoList
    };
  }
  it('todoProvider와 함께 렌더링 되는지 with sbumitbutton, todoList', () => {
    const {submitButton, todoList} = useSetup();
    expect(submitButton).toBeInTheDocument();
    expect(todoList).toBeInTheDocument();
  });

  it('input 입력 후 todo 추가버튼 눌렀을 때 추가 되는지 테스트', async() => {
    const {input, submitButton, mockAddTodo} = useSetup();

    await userEvent.type(input, "new todo");
    await userEvent.click(submitButton);

    expect(mockAddTodo).toBeCalledWith("new todo");
  });
});