import { atom } from "recoil";
export interface Todo {
  id: number;
  value: string;
  done: boolean;
  modifyMode: boolean;
}
export interface TodoContextState {
  Todos: Todo[],
  addTodo: (value: string) => void;
  deleteTodo: (id: number) => void;
  toggleTodo: (id: number) => void;
  changeTodo: (id: number, value: string) => void;
  changeModifyMode: (id: number) => void;
}

const TodoAtomState = atom<Todo[]>(
  {
    key: 'TodoAtomState', 
    default: [],
  }
);

export default TodoAtomState;