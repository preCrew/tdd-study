import React, { useRef, useState } from 'react';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import useTodo from './recoil/hook/todoAtom';

const TodoApp = () => {
    const [state, setState] = useState<{id: number, item: string}[]>([]);
    const { todo,setTodo } = useTodo()
    const nextId = useRef(1);
    const [selectdTodo,setSelectdTodo] = useState(0)
    const [editMode,setEditMode] = useState(false)

    const handleInsert = (todo: string) => {
      setTodo(prev => ([...prev, {id: nextId.current++, item: todo}]));
    } 

    const onDelete = (id: number) => {
      const result = todo.filter(item => item.id !== id)
      setTodo(result)
    }

    const onEdit = (id: number) => {
      setEditMode(true)
      setSelectdTodo(id)
    }

    const onCompletedEdit = (id:number,text:string) => {
      setEditMode(false)
      const result = todo.map(item => {
        if(item.id === id) {
          item.item = text
        }

        return item
      });
      console.log(result)
    }
  
    return (
        <div data-testid="TodoApp">
          <TodoForm onInsert={handleInsert}/>
          <TodoList data-testid="TodoList" 
            // todoItems={todo} 
            onDelete={onDelete} 
            editMode={editMode} 
            onEdit={onEdit}
            onCompletedEdit={onCompletedEdit}
            selectdTodo={selectdTodo}
          />
        </div>
    );
};

export default TodoApp;