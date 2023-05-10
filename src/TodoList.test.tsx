import { render, screen } from "@testing-library/react"
import TodoList from "./TodoList"


describe('<TodoList/>', () => {
  const todoItems = [
    {id: 1, item: 'item1'},
    {id: 2, item: 'item2'},
    {id: 3, item: 'item3'},
    {id: 4, item: 'item4'}
  ];

  it('render with todos', () => {
    render(<TodoList todoItems={todoItems}/>);
    
    todoItems.forEach(({id, item}) => {
      screen.getByText(item);
    });
  });
})