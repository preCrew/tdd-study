import { fireEvent, getByTestId, render, screen } from "@testing-library/react"
import TodoList from "./TodoList"


describe('<TodoList/>', () => {
  const todoItems = [
    {id: 1, item: 'item1'},
    {id: 2, item: 'item2'},
    {id: 3, item: 'item3'},
    {id: 4, item: 'item4'}
  ];

  const onDelete = jest.fn();
  const onEdit = jest.fn();
  const onCompletedEdit = jest.fn();
  const editMode = true;
  const selectdTodo = 1;

  //todo 화면에 렌더링
  it('render with todos', () => {
    render(<TodoList 
      todoItems={todoItems} 
      onDelete={onDelete} 
      onEdit={onEdit} 
      editMode={editMode} 
      onCompletedEdit={onCompletedEdit}
      selectdTodo={selectdTodo}
      />);
    
    todoItems.forEach(({id, item}) => {
      screen.getByText(item);
    });
  });

  //삭제버튼 클릭시 onDelete가 실행되는지
  it('delete todo', () => {
    render(<TodoList 
      todoItems={todoItems} 
      onDelete={onDelete} 
      onEdit={onEdit} 
      editMode={editMode} 
      onCompletedEdit={onCompletedEdit}
      selectdTodo={selectdTodo}
      />);
    
    const deleteBtn = screen.getAllByText('삭제')

    //모든 리스트의 삭제버튼 클릭
    deleteBtn.forEach((button) => {
      fireEvent.click(button)
    })

    expect(onDelete).toHaveBeenCalled();    
  })

  //편집버큰 클릭시 onEdit가 실행 => 기존 todo가 담겨진 input이랑 완료버튼 뜨기
  it('edit todo -> input 안에 기존 todo와 완료버튼 실행', () => {
    render(<TodoList 
      todoItems={todoItems} 
      onDelete={onDelete} 
      onEdit={onEdit} 
      editMode={editMode} 
      onCompletedEdit={onCompletedEdit}
      selectdTodo={selectdTodo}
      />);
     
    const editBtn = screen.getAllByText('편집')

    //모든 리스트의 편집버튼 클릭
    editBtn.forEach((button) => {
      fireEvent.click(button)
    })
    
    const editInput = screen.getAllByTestId('FormEditInput');
    const editCompletedBtn = screen.getAllByText('수정');

    editCompletedBtn.forEach(button => {
      fireEvent.click(button) 
    })
    //기존 todo 있는지
    editInput.forEach((input,idx) => {
      expect(input).toHaveValue(todoItems[idx].item);    
    })

    // todoItems.forEach((v,idx) => {
    //   fireEvent.change(editInput[idx], {
    //     target:{
    //       value: v.item
    //     }
    //   })
    //   expect(editInput[idx]).toHaveAttribute('value', v.item);  
    // })
  })

  // it('편집 input change',() => {
  //   const editInput = screen.getAllByTestId('FormEditInput');

  //   editInput.forEach((v,idx) => {

  //   })
  // })
})