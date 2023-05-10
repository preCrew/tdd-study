import TodoItem from "./TodoItem";

const TodoList = ({todoItems}:{todoItems: {id: number, item: string}[]}) => {
    return (
    <ul data-testid="TodoList">
      {
        todoItems.map(({id, item}) =>(
          <TodoItem key={id} item={item}/>
        ))
      }
    </ul>);
  }
  
  export default TodoList;