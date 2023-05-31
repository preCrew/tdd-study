import React,{ useState } from "react";
import TodoItem from "./TodoItem";
import useTodo from "./recoil/hook/todoAtom";

const TodoList = ({
  onDelete,
  onEdit,
  editMode,
  onCompletedEdit,
  selectdTodo}: 
  {
  onDelete: (id: number) => void,
  onEdit: (id: number) => void,
  editMode: boolean,
  onCompletedEdit: (id: number,text: string) => void,
  selectdTodo: number
}) => {

  const [value,setState] = useState('')
  const {todo,setTodo} = useTodo()

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState(e.target.value)
  }


    return (
    <ul data-testid="TodoList">
      {
        todo.map(({id, item}) =>(
          <li key={id}>
            <TodoItem item={item}/>
            <button onClick={() => onDelete(id)}>삭제</button>
            <button onClick={() => onEdit(id)}>편집</button>

            {editMode && (selectdTodo === id) &&
            <>
              <input type="text" value={value || item} data-testid="FormEditInput" onChange={onChange} />
              <button onClick={() => onCompletedEdit(id,value)}>수정</button>
            </> 
            }
          </li>
        ))
      }
    </ul>);
  }
  
  export default TodoList;