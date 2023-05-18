import { useContext } from "react"
import { TodoContext } from "../context/TodoContext"

const useTodoContext = () => {
  const state = useContext(TodoContext);
  if (!state) {
    throw new Error('cannot find TodoContext Provider');
  }
  return state;
}

export default useTodoContext;