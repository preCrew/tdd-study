import { ChangeEvent, useState } from "react";
import { Todo } from "../context/TodoContext";
import useTodoContext from "../hooks/useTodoContext";
import "./todoItem.css";

interface TodoItemProps {
  item: Todo,
}

const TodoItem = ({item}: TodoItemProps) => {
  const {deleteTodo, changeTodo, changeModifyMode, toggleTodo} = useTodoContext();
  const [inputVal, setInputVal] = useState('');
  
  const handleClickDeleteButton = () => {
    deleteTodo(item.id);
  }

  const handleClickModifyButton = () => {
    if (item.modifyMode) {
      if(!inputVal) {
        alert("입력값이 없습니다.");
        return;
      }

      changeTodo(item.id, inputVal);
      changeModifyMode(item.id);
      
    }else {
      changeModifyMode(item.id);
    }
  }

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInputVal(e.target.value);
  }

  const handleClickItem = () => {
    toggleTodo(item.id);
  }

  return (
  <li>

    {item.modifyMode 
      ? <input data-testid="ModifyInput" 
          onChange={handleChangeInput} 
          value={inputVal}
          type="text" 
        />
      : <span 
          className={item.done ? "line-through" : ""}
          onClick = {handleClickItem}
        >
          {item.value}
        </span>
    }

    <button data-testid="DeleteButton" 
      onClick={handleClickDeleteButton}
    >
      X
    </button>

    <button data-testid="ModifyButton"
      onClick={handleClickModifyButton}
    >
      {item.modifyMode ? '완료' : '수정'}
    </button>
  </li>);
}

export default TodoItem;