import { createContext, ReactNode, useRef, useState } from "react";

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

const TodoContext = createContext<TodoContextState | null>(null);

const TodoProvider = ({children, value, init = []}: {children: ReactNode, value?: TodoContextState, init?: Todo[]}) => {
  const [Todos, setState] = useState<Todo[]>(init ?? value?.Todos);
  const nextId = useRef(0);

  const addTodo = (value: string) => {
    setState(prev => [...prev, {id: nextId.current++, value, done: false, modifyMode: false}]);
  }

  const deleteTodo = (id: number) => {
    setState(prev => prev.filter(todo => todo.id !== id));
  }

  const toggleTodo = (id: number) => {
    setState(prev => 
      prev.map( todo => 
        todo.id === id 
        ? {...todo, done: !todo.done}
        : todo
      )
    );
  }

  const changeTodo = (id: number, value: string) => {
    setState(prev => 
      prev.map( todo => 
        todo.id === id 
        ? {...todo, value}
        : todo
      )
    );
  }

  const changeModifyMode = (id: number) => {
      setState(prev => 
        prev.map( todo => 
          todo.id === id 
          ? {...todo, modifyMode: !todo.modifyMode}
          : todo
        )
      );
  }

  return (
    <TodoContext.Provider value={value ?? {Todos, addTodo, deleteTodo, toggleTodo, changeTodo, changeModifyMode}}>
      {children}
    </TodoContext.Provider>
  );
}

export {TodoContext, TodoProvider};