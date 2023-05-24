import { useRecoilState } from "recoil"
import TodoAtomState from "../recoil/TodoAtomState"
import { useRef } from "react";

const useTodoState = () => {
  const [todoState, setTodoState] = useRecoilState(TodoAtomState);
  const nextId = useRef(1);

  const addTodo = (value: string) => {
    setTodoState(prev => ([...prev, 
      {
        id: nextId.current++, 
        done: false, 
        modifyMode: false, 
        value
      }
    ]));
  };

  const deleteTodo = (id: number) => {
    setTodoState(prev => prev.filter( todo => todo.id !== id ));
  };

  const toggleTodo = (id: number) => {
    setTodoState(prev => 
      prev.map( todo => 
        todo.id === id 
        ? {...todo, done: !todo.done}
        : todo
      )
    );
  };

  const changeTodo = (id: number, value: string) => {
    setTodoState(prev => 
      prev.map( todo => 
        todo.id === id 
        ? {...todo, value}
        : todo
      )
    );
  };

  const changeModifyMode = (id: number) => {
    setTodoState(prev => 
      prev.map( todo => 
        todo.id === id 
        ? {...todo, modifyMode: !todo.modifyMode}
        : todo
      )
    );
  };

  return {todoState, addTodo, deleteTodo, toggleTodo, changeTodo, changeModifyMode};
}

export default useTodoState;