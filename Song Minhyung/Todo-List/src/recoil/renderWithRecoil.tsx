import { render } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import TodoAtomState from "./TodoAtomState";
import { mockTodos } from "../mocks/todo";

const renderWithRecoil = (
  renderTarget: React.ReactElement<any, string |React.JSXElementConstructor<any>>
) => {
  const wrapper = ({children}: {children: React.ReactNode}) => (
    <RecoilRoot 
      initializeState={({set}) => set(TodoAtomState, mockTodos)}
    >
      {children}
    </RecoilRoot>
  );
  const options =  render(renderTarget, {wrapper});
  return {options};
}

export default renderWithRecoil