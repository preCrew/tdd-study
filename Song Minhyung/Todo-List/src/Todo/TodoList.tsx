import useTodoState from "../hooks/useTodoState";
import TodoItem from "./TodoItem";

interface TodoListProps {
  // todoItems: Todo[];
}
const TodoList = ({}: TodoListProps) => {
    const {
      todoState, 
      changeModifyMode, 
      changeTodo, 
      deleteTodo, 
      toggleTodo
    } = useTodoState();

    return (
      <ul data-testid="TodoList">
        {
          todoState.map((item) =>(
            <TodoItem 
              key={item.id} 
              item={item} 
              deleteTodo={deleteTodo}
              changeTodo={changeTodo}
              toggleTodo={toggleTodo}
              changeModifyMode={changeModifyMode}
            />
          ))
        }
      </ul>
    );
  }
  
  export default TodoList;