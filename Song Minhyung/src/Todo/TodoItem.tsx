import { Todo } from "../context/TodoContext";
import useTodoContext from "../hooks/useTodoContext";


interface TodoItemProps {
  item: Todo,
}

const TodoItem = ({item}: TodoItemProps) => {
  const {deleteTodo} = useTodoContext()
  
  const handleClickDeleteButton = () => {
    deleteTodo(item.id);
  }

  return (
  <>
    <span>{item.value}</span>
    <button 
      data-testid="DeleteButton" 
      onClick={handleClickDeleteButton}
    >
      X
    </button>
  </>);
}

export default TodoItem;