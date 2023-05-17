import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event";
import TodoApp from "./TodoApp"
import { TodoProvider } from "./TodoContext";
import { mockTodos } from "./hooks/useMockTodoContext";

describe('<TodoApp/>', () => {

  const useSetup = () => {
    render(<TodoProvider init={mockTodos}><TodoApp/></TodoProvider>);

    const input = screen.getByTestId("TodoFormInput");
    const submitButton = screen.getByTestId('TodoFormButton')
    const todoList = screen.getByTestId('TodoList');

    return {
      input, submitButton, todoList
    };
  }
  
  it('todoProvider와 함께 렌더링 되는지 with sbumitbutton, todoList', () => {
    const {submitButton, todoList} = useSetup();
    expect(submitButton).toBeInTheDocument();
    expect(todoList).toBeInTheDocument();
  });

  it('input 입력 후 todo 추가버튼 눌렀을 때 추가 되는지 테스트', async () => {
    const { input, submitButton } = useSetup();
    const newTodo = "new todo";
  
    await userEvent.type(input, newTodo);
    await userEvent.click(submitButton);

    const newTodoComponent = screen.getByText("new todo")
    expect(newTodoComponent).toBeInTheDocument();
  
  });

  it('삭제버튼 눌렀을때 해당 todo가 screen에서 지워지는지', async () => {
    useSetup();
    const firstDeleteButton = screen.getAllByTestId("DeleteButton")[0];

    await userEvent.click(firstDeleteButton);

    const beforeItem = screen.queryByText(mockTodos[0].value);
    expect(beforeItem).not.toBeInTheDocument();
  });
});