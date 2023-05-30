import { ChangeEvent, useState } from "react";
import { Todo } from "../recoil/TodoAtomState";
import "./todoItem.css";

export interface TodoItemProps {
  item: Todo,
  deleteTodo: (id: number) => void;
  changeTodo: (id: number, value :string) => void;
  toggleTodo: (id: number) => void;
  changeModifyMode: (id: number) => void;
}

const TodoItem = ({
  item, deleteTodo, changeTodo, toggleTodo, changeModifyMode
}: TodoItemProps) => {
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
      setInputVal(item.value);
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