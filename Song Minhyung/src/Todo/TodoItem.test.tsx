import {  screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import TodoItem from "./TodoItem"
import { Todo } from "../context/TodoContext";
import useMockTodoContext from "../hooks/useMockTodoContext";

interface MockItem {
  done?: boolean;
  modifyMode?: boolean
}
const mockItem = ({done, modifyMode}: MockItem):Todo => ({
  id: 1, value: 'TestTodo1', done: done ?? false, modifyMode: modifyMode ?? false,
});

const useSetup = (item: Todo, ) => {
  const {
    mockAddTodo, mockDeleteTodo, mockToggleTodo, mockChangeTodo, mockChangeModifyMode
  } = useMockTodoContext(<TodoItem item={item}/>);

  const deleteButton = screen.getByTestId("DeleteButton") as HTMLButtonElement
  const modifyButton = screen.getByTestId("ModifyButton") as HTMLButtonElement;
  const modifyInput = screen.queryByTestId("ModifyInput") as HTMLInputElement;
  const itemSpan = screen.queryByText(item.value) as HTMLSpanElement;
  

  return { 
    mockAddTodo, mockDeleteTodo, mockToggleTodo, mockChangeTodo, mockChangeModifyMode,
    itemSpan, deleteButton, modifyButton, modifyInput
  };
}
describe('<TodoItem/> modifyMode false일때', () => {
  const item = mockItem({modifyMode: false});

  it('렌더링', () => {
    let {modifyButton, itemSpan, modifyInput} = useSetup(item);

    expect(modifyButton.innerHTML).toBe("수정");
    expect(modifyInput).not.toBeInTheDocument();
    expect(itemSpan).toBeInTheDocument();
  });

  it('수정 버튼클릭', async () => {
    const item = mockItem({modifyMode: false});
    let {modifyButton, mockChangeModifyMode, mockChangeTodo} = useSetup(item);

    await userEvent.click(modifyButton);
    // modifyMode(item.id)
    expect(mockChangeModifyMode).toBeCalledWith(item.id);
    // changeTodo 호출 x
    expect(mockChangeTodo).not.toBeCalled();
  });
});

describe('<TodoItem/> modifyMode true일때', () => {
  const item = mockItem({modifyMode: true});
  const changedValue = "changed Value";

  it('렌더링', () => {
    let {modifyButton, itemSpan, modifyInput} = useSetup(item);

    expect(modifyButton.innerHTML).toBe("완료");
    expect(modifyInput).toBeInTheDocument();
    expect(itemSpan).not.toBeInTheDocument();
  });

  it('input 입력후 "완료" 버튼을 클릭하면', async () =>{
    let {modifyButton, modifyInput, mockChangeModifyMode, mockChangeTodo} = useSetup(item);
    
    await userEvent.type(modifyInput, changedValue);
    expect(modifyInput.value).toBe(changedValue);

    await userEvent.click(modifyButton);
    expect(mockChangeModifyMode).toBeCalledWith(item.id);
    expect(mockChangeTodo).toBeCalledWith(item.id, changedValue);
  });

  it('input 값이 비어있을 때 "완료" 버튼을 클릭하면', async () => {
    let {modifyButton, mockChangeModifyMode, mockChangeTodo} = useSetup(item);

    window.alert = jest.fn();
    
    await userEvent.click(modifyButton);
    expect(mockChangeModifyMode).not.toBeCalled();
    expect(mockChangeTodo).not.toBeCalled();
    expect(window.alert).toBeCalledWith("입력값이 없습니다.");
  });

});

describe('<TodoItem/> isDone true or false', () => {

  it('item 의 isDone 이 false일때, 클릭하면', async () => {
    const item = mockItem({done: false});
    const {itemSpan, mockToggleTodo} = useSetup(item);

    expect(itemSpan).not.toHaveClass("line-through");
    
    await userEvent.click(itemSpan);

    expect(mockToggleTodo).toBeCalledWith(item.id);
  });

  it('item 의 isDone 이 true일때, 클릭하면', async () => {
    const item = mockItem({done: true});
    const {itemSpan, mockToggleTodo} = useSetup(item);

    expect(itemSpan).toHaveClass("line-through");
    
    await userEvent.click(itemSpan);

    expect(mockToggleTodo).toBeCalledWith(item.id);
  });
});
