import { screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event";
import TodoApp from "./TodoApp"
import useMockTodoContext, { mockTodos } from "../hooks/useMockTodoContext";

describe('<TodoApp/>', () => {

  const useSetup = () => {
    const {mockAddTodo, mockDeleteTodo} = useMockTodoContext(<TodoApp/>);

    const input = screen.getByTestId("TodoFormInput");
    const submitButton = screen.getByTestId('TodoFormButton')
    const todoList = screen.getByTestId('TodoList');

    return {
      input, submitButton, todoList,
      mockAddTodo, mockDeleteTodo
    };
  }
  
  it('todoProvider와 함께 렌더링 되는지 with sbumitbutton, todoList', () => {
    const {submitButton, todoList} = useSetup();
    expect(submitButton).toBeInTheDocument();
    expect(todoList).toBeInTheDocument();
  });

  it('input 입력 후 todo 추가버튼 눌렀을 add함수에 value 잘 넘어가는지', async () => {
    const { input, submitButton, mockAddTodo } = useSetup();
    const newTodo = "new todo";
  
    await userEvent.type(input, newTodo);
    await userEvent.click(submitButton);

    expect(mockAddTodo).toBeCalledWith(newTodo);
  });

  it('삭제버튼 눌렀을때 delete함수에 id가 잘 넘어가는지', async () => {
    const {mockDeleteTodo} = useSetup();
    const firstDeleteButton = screen.getAllByTestId("DeleteButton")[0];

    await userEvent.click(firstDeleteButton);

    expect(mockDeleteTodo).toBeCalledWith(mockTodos[0].id);
  });
});