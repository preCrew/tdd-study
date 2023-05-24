import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import TodoItem from "./TodoItem"
import { RecoilRoot } from "recoil";
import TodoAtomState, { Todo } from "../recoil/TodoAtomState";

interface MockItem {
  done?: boolean;
  modifyMode?: boolean
}
const mockItem = ({done, modifyMode}: MockItem):Todo => ({
  id: 1, value: 'TestTodo1', done: done ?? false, modifyMode: modifyMode ?? false,
});

const setup = (item: Todo, ) => {
  const mockDeleteTodo = jest.fn();
  const mockToggleTodo = jest.fn();
  const mockChangeTodo = jest.fn();
  const mockChangeModifyMode = jest.fn();

  const wrapper = (({children}: {children: React.ReactNode}) => 
    <RecoilRoot initializeState={({set}) => {
      set(TodoAtomState, [{id: 0, done: false, modifyMode: false, value: "todoItem"}]);
    }}>
      {children}
    </RecoilRoot>
  );

  render(<TodoItem 
    item={item}
    deleteTodo={mockDeleteTodo}
    changeTodo={mockChangeTodo}
    toggleTodo={mockToggleTodo}
    changeModifyMode={mockChangeModifyMode}
  />, {wrapper});

  const deleteButton = screen.getByTestId("DeleteButton") as HTMLButtonElement
  const modifyButton = screen.getByTestId("ModifyButton") as HTMLButtonElement;
  const modifyInput = screen.queryByTestId("ModifyInput") as HTMLInputElement;
  const itemSpan = screen.queryByText(item.value) as HTMLSpanElement;
  

  return { 
    mockDeleteTodo, mockToggleTodo, mockChangeTodo, mockChangeModifyMode,
    itemSpan, deleteButton, modifyButton, modifyInput
  };
}
describe('<TodoItem/> modifyMode false일때', () => {
  const item = mockItem({modifyMode: false});

  it('렌더링', () => {
    let {modifyButton, itemSpan, modifyInput} = setup(item);

    expect(modifyButton.innerHTML).toBe("수정");
    expect(modifyInput).not.toBeInTheDocument();
    expect(itemSpan).toBeInTheDocument();
  });

  it('수정 버튼클릭하면 수정버튼 changeModifyMode 호출됨', async () => {
    const item = mockItem({modifyMode: false});
    const {modifyButton, mockChangeModifyMode} = setup(item);

    await userEvent.click(modifyButton);
    expect(mockChangeModifyMode).toBeCalledWith(item.id);
  });
});

describe('<TodoItem/> modifyMode true일때', () => {
  const item = mockItem({modifyMode: true});
  const changedValue = "changed Value";

  it('렌더링', () => {
    let {modifyButton, itemSpan, modifyInput} = setup(item);

    expect(modifyButton.innerHTML).toBe("완료");
    expect(modifyInput).toBeInTheDocument();
    expect(itemSpan).not.toBeInTheDocument();
  });

  it('input 입력후 "완료" 버튼을 클릭하면', async () =>{
    let {modifyButton, modifyInput, mockChangeModifyMode, mockChangeTodo} = setup(item);
    
    await userEvent.type(modifyInput, changedValue);
    expect(modifyInput.value).toBe(changedValue);

    await userEvent.click(modifyButton);
    expect(mockChangeModifyMode).toBeCalledWith(item.id);
    expect(mockChangeTodo).toBeCalledWith(item.id, changedValue);
  });

  it('input 값이 비어있을 때 "완료" 버튼을 클릭하면 alert 출력', async () => {
    let {modifyButton, mockChangeModifyMode, mockChangeTodo} = setup(item);

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
    const {itemSpan, mockToggleTodo} = setup(item);

    expect(itemSpan).not.toHaveClass("line-through");
    
    await userEvent.click(itemSpan);

    expect(mockToggleTodo).toBeCalledWith(item.id);
  });

  it('item 의 isDone 이 true일때, 클릭하면', async () => {
    const item = mockItem({done: true});
    const {itemSpan, mockToggleTodo} = setup(item);

    expect(itemSpan).toHaveClass("line-through");
    
    await userEvent.click(itemSpan);

    expect(mockToggleTodo).toBeCalledWith(item.id);
  });
});

test('삭제버튼 눌렸을 때 id 잘 넘어가는지 확인', async () => {
  const item = mockItem({done: false});
  const {mockDeleteTodo, deleteButton} = setup(item);

  await userEvent.click(deleteButton);

  expect(mockDeleteTodo).toBeCalledWith(item.id);
});