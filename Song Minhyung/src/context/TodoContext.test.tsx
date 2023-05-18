import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import {  TodoProvider } from "./TodoContext";
import { mockTodos } from "../hooks/useMockTodoContext";
import useTodoContext from "../hooks/useTodoContext";

const newTodoValue = "this is a new todo value";
const changedTodoValue = "todo item is changed";

describe("TodoProvider Test", () => {
  
  const TestComponent = () => {
    const {Todos, addTodo, deleteTodo, toggleTodo, changeTodo, changeModifyMode} = useTodoContext();

    return (
      <>
        <button data-testid="addTodo"
          onClick={() => addTodo(newTodoValue)}
        > add Todo Button </button>

        
        {Todos.map(todo => (
          <div data-testid="todoItem" key={todo.id}
            onClick={() => toggleTodo(todo.id)} 
          >
            {`done: ${todo.id} ${todo.done}`}
            {`modify: ${todo.id} ${todo.modifyMode}`}
            {todo.value}

            <div data-testid="deleteTodo"
              onClick={() => deleteTodo(todo.id)}
            > delete Todo Button</div>

            <div data-testid="changeTodo"
              onClick={() => changeTodo(todo.id, changedTodoValue)}
            > change Todo Button</div>

            
            <div data-testid="changeModify"
              onClick={() => changeModifyMode(todo.id)}
            > change Modify Button</div>
        </div>
        ))}
      </>
    );
  }

  const setup = () => {
    render(<TodoProvider init={mockTodos}><TestComponent/></TodoProvider>);
  }

  it("addTodo 확인, newTodoValue 추가 되는지", async () => {
    setup();

    const addButton = screen.getByTestId("addTodo")
    await userEvent.click(addButton);

    const newTodo = screen.getByText(new RegExp(newTodoValue));
    expect(newTodo).toBeInTheDocument();
  });

  it("deleteTodo 확인, 리스트중 첫번째 todo 지워지는지", async () => {
    setup();

    const deleteButton = screen.getAllByTestId("deleteTodo")[0];
    await userEvent.click(deleteButton);
    
    const beforeTodo = screen.queryByText(mockTodos[0].value);
    expect(beforeTodo).not.toBeInTheDocument();
  });

  it("toggleTodo: 한번 클릭시 true, 두번 클릭시 false 되는지 확인", async () => {
    setup();
    const trueReg = new RegExp(`done: ${mockTodos[0].id } true`);
    const falseReg = new RegExp(`done: ${mockTodos[0].id } false`);

    const firstItem = screen.getAllByTestId("todoItem")[0];
    await userEvent.click(firstItem);

    let isDoneTrue = screen.getByText(trueReg);
    expect(isDoneTrue).toBeInTheDocument();

    await userEvent.click(firstItem);
    const isDoneFalse = screen.getByText(falseReg);
    expect(isDoneFalse).toBeInTheDocument();
  });

  it("changeTodo 확인, 첫번째 todo 변경해서 제대로 변경되는지", async () => {
    setup();

    const firstChangeButton = screen.getAllByTestId("changeTodo")[0];
    await userEvent.click(firstChangeButton);

    const changedTodo = screen.getByText(new RegExp(changedTodoValue));
    expect(changedTodo).toBeInTheDocument();
  });

  it("changeModify확인, 첫번째 todo의 modifyMode 제대로 변경되는지확인", async () => {
    setup();
    const trueReg = new RegExp(`modify: ${mockTodos[0].id } true`);
    const falseReg = new RegExp(`modify: ${mockTodos[0].id } false`);

    const firstChangeButton = screen.getAllByTestId("changeModify")[0];

    // 최초에는 modifyMode false
    let isModifyModeFalse = screen.getByText(falseReg);
    expect(isModifyModeFalse).toBeInTheDocument();

    await userEvent.click(firstChangeButton);

    // 한번 누르면 modifyMode true
    let isModifyModeTrue = screen.getByText(trueReg);
    expect(isModifyModeTrue).toBeInTheDocument();
  })
});