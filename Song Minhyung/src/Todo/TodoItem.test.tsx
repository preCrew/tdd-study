import { screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import renderWithRecoil from "../recoil/renderWithRecoil";
import { mockTodo } from "../mocks/todo";
import TodoItem, { TodoItemProps } from "./TodoItem";

const deleteTodo = jest.fn();
const toggleTodo = jest.fn();
const changeTodo = jest.fn();
const changeModifyMode = jest.fn();

const props: TodoItemProps = {
  item: mockTodo,
  deleteTodo,
  toggleTodo,
  changeTodo,
  changeModifyMode,
};

const setup = () => {
  const {options}= renderWithRecoil(<TodoItem {...props}/>);

  const deleteButton = screen.getByTestId("DeleteButton") as HTMLButtonElement
  const modifyButton = screen.getByTestId("ModifyButton") as HTMLButtonElement;
  const modifyInput = screen.queryByTestId("ModifyInput") as HTMLInputElement;
  const itemSpan = screen.queryByText(mockTodo.value) as HTMLSpanElement;

  return { 
    ...options, props, itemSpan, deleteButton, modifyButton, modifyInput
  };
}
const clickModifyButton = async() => {
  const setups = setup();

  await userEvent.click(setups.modifyButton);
  expect(setups.props.changeModifyMode).toBeCalledWith(mockTodo.id);

  setups.rerender(<TodoItem {...props} item={{...mockTodo, modifyMode: true}}/>);

  const modifyInput = screen.queryByTestId("ModifyInput") as HTMLInputElement;

  return {...setups, modifyInput};
}

describe('<TodoItem>', () => {
  it('최초 렌더링시 item.value값을 가진 span과 수정버튼이 존재함', () => {
    const {itemSpan, modifyButton} = setup();

    expect(itemSpan.innerHTML).toBe(mockTodo.value);
    expect(modifyButton.innerHTML).toBe("수정");
  });

  it('수정버튼 클릭시 item.value값을 가진 input과 완료버튼이 존재함', async () => {
    const {modifyButton, modifyInput} = await clickModifyButton();
    
    expect(modifyButton.innerHTML).toBe("완료");
    expect(modifyInput.value).toBe(mockTodo.value);
  });

  it('완료버튼 클릭시 값이 있다면 changeTodo 함수를 호출함', async () => {
    const {modifyButton, modifyInput} = await clickModifyButton();

    await userEvent.clear(modifyInput);
    await userEvent.type(modifyInput, "new Todo");
    await userEvent.click(modifyButton);

    expect(changeTodo).toBeCalledWith(mockTodo.id, "new Todo");
  });

  it('완료버튼 클릭시 값이 없다면 alert(입력값이 없습니다.) 를 출력함', async () => {
    const {modifyInput, modifyButton} = await clickModifyButton();
    window.alert = jest.fn();

    await userEvent.clear(modifyInput);
    await userEvent.click(modifyButton);

    expect(window.alert).toBeCalledWith("입력값이 없습니다.");
  });

  it('삭제버튼 클릭시 deleteTodo(id)가 호출됨', async ()=>{
    const {props: {deleteTodo}, deleteButton} = setup();

    await userEvent.click(deleteButton);

    expect(deleteTodo).toBeCalledWith(mockTodo.id);
  });

  it('span 클릭시 가운데 줄이 생기고toggleTodo(id)가 호출됨, 다시한번 클릭시 줄이 없어짐', async ()=>{
    const {props, itemSpan, rerender} = setup();

    await userEvent.click(itemSpan);
    rerender(<TodoItem {...props} item={{...mockTodo, done: true}}/>);

    expect(toggleTodo).toBeCalledWith(mockTodo.id);
    expect(itemSpan).toHaveClass("line-through");


    await userEvent.click(itemSpan);
    rerender(<TodoItem {...props} item={{...mockTodo, done: false}}/>);

    expect(toggleTodo).toBeCalledWith(mockTodo.id);
    expect(itemSpan).not.toHaveClass("line-through");
  });
  
});