import TodoItem from "./TodoItem";
import { Todo} from "./TodoContext";

interface TodoListProps {
  todoItems: Todo[];
}
const TodoList = ({todoItems}: TodoListProps) => {
    return (
    <ul data-testid="TodoList">
      {
        todoItems.map((item) =>(
          <TodoItem 
            key={item.id} 
            item={item} 
          />
        ))
      }
    </ul>);
  }
  
  export default TodoList;