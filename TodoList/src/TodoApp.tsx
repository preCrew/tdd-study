import { useRef, useState } from 'react';
import TodoForm from './TodoForm';
import TodoList from './TodoList';

const TodoApp = () => {
    const [state, setState] = useState<{id: number, item: string}[]>([]);
    const nextId = useRef(1);
    const [selectdTodo,setSelectdTodo] = useState(0)
    const [editMode,setEditMode] = useState(false)

    const handleInsert = (todo: string) => {
      setState(prev => ([...prev, {id: nextId.current++, item: todo}]));
    } 

    const onDelete = (id: number) => {
      const result = state.filter(item => item.id !== id)
      setState(result)
    }

    const onEdit = (id: number) => {
      setEditMode(true)
      setSelectdTodo(id)
    }

    const onCompletedEdit = (id:number,text:string) => {
      setEditMode(false)
      const result = state.map(item => {
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
            todoItems={state} 
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