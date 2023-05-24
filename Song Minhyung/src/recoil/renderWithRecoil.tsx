import { render } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import TodoAtomState, { Todo } from "./TodoAtomState";

export const mockTodos:Todo[] = [
  {id: 10, value: 'Test todo1', done: false, modifyMode: false},
  {id: 20, value: 'Test todo2', done: false, modifyMode: false},
];

export const wrapper = ({children}: {children: React.ReactNode}) => (
  <RecoilRoot 
    initializeState={({set}) => set(TodoAtomState, mockTodos)}
  >
    {children}
  </RecoilRoot>
);

const renderWithRecoil = (renderTarget: React.ReactElement<any, string | React.JSXElementConstructor<any>>) => {

  render(renderTarget, {wrapper});

  // return {mockTodos, mockAddTodo, mockDeleteTodo,mockToggleTodo, mockChangeTodo, mockChangeModifyMode}
  return {mockTodos};
}

export default renderWithRecoil;