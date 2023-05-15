import { createContext, ReactNode, useRef, useState } from "react";

export interface Todo {
  id: number;
  value: string;
}
export interface TodoContextState {
  Todos: Todo[],
  addTodo: (value: string) => void;
  deleteTodo: (id: number) => void;
}

const TodoContext = createContext<TodoContextState | null>(null);

const TodoProvider = ({children, init = []}: {children: ReactNode, init?: Todo[]}) => {
  const [Todos, setState] = useState<Todo[]>(init);
  const nextId = useRef(0);

  const addTodo = (value: string) => {
    setState(prev => [...prev, {id: nextId.current++, value}]);
  }

  const deleteTodo = (id: number) => {
    setState(prev => prev.filter(todo => todo.id !== id));
  }
  return (
    <TodoContext.Provider value={{Todos, addTodo, deleteTodo}}>
      {children}
    </TodoContext.Provider>
  );
}

export {TodoContext, TodoProvider};