import { renderHook } from "@testing-library/react";
import useTodoState from "./useTodoState";
import { RecoilRoot } from "recoil";
import { act } from "react-dom/test-utils";

describe('useTodoState', () => {
  const setup = () => {
    const { result } = renderHook(()=> useTodoState(), {wrapper: RecoilRoot});
    act(()=>{
      result.current.addTodo("newTodoInit");
    })
    return { result };
  }

  it('초기 상태 = todo 1개', () => {
    const { result } = setup();
    expect(result.current.todoState).toHaveLength(1);
  });

  it('addTodo(value) 호출시 todoState에 값이 들어감', async () => {
    const { result } = setup();

    act(()=>{
      result.current.addTodo("newTodo");
    });

    expect(result.current.todoState[1].value).toBe("newTodo");
  });

  it('deleteTodo(2) 호출시 id가 2인 요소 없음',()=>{
    const { result } = setup();

    act(()=>{
      result.current.deleteTodo(2);
    });

    expect(result.current.todoState.every(todo => todo.id !== 2)).toBeTruthy();
  });

  it('toggleTodo(1) 호출시 해당 id의 의 값은 바뀌어야함.', () => {
    const { result } = setup();

    act(()=>{
      result.current.toggleTodo(1);
    });
    let todo = result.current.todoState.find( todo => todo.id === 1);
    expect(todo?.done).toBeTruthy();


    act(()=>{
      result.current.toggleTodo(1);
    });
    todo = result.current.todoState.find( todo => todo.id === 1);
    expect(todo?.done).toBeFalsy();
  });

  it('changeTodo(1, "changedTodo") 호출시 해당 id의 todo가 변경되어야 함', () => {
    const { result } = setup();

    act(()=>{
      result.current.changeTodo(1, "changedTodo")
    });
    const todo = result.current.todoState.find( todo => todo.id === 1);
    expect(todo?.value).toBe("changedTodo");
  });

  it('changeModifyMode 호출시 해당 id의 ModifyMode 값은 바뀌어야함', () => {
    const { result } = setup();

    act(()=>{
      result.current.changeModifyMode(1);
    });
    let todo = result.current.todoState.find( todo => todo.id === 1);
    expect(todo?.modifyMode).toBeTruthy();

    act(()=>{
      result.current.changeModifyMode(1);
    });
    todo = result.current.todoState.find( todo => todo.id === 1);
    expect(todo?.modifyMode).toBeFalsy();
  })
});