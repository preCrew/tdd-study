import { Todo } from "../recoil/TodoAtomState";

export const mockTodo: Todo = {
  id: 10, value: 'TestTodo1', done:false, modifyMode: false,
};

export const mockTodos:Todo[] = [
  {id: 10, value: 'Test todo1', done: false, modifyMode: false},
  {id: 20, value: 'Test todo2', done: false, modifyMode: false},
];