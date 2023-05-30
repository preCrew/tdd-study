import { atom } from "recoil";
export interface Todo {
  id: number;
  value: string;
  done: boolean;
  modifyMode: boolean;
}

const TodoAtomState = atom<Todo[]>(
  {
    key: 'TodoAtomState', 
    default: [],
  }
);

export default TodoAtomState;