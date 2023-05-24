import { screen } from "@testing-library/react"
import renderWithRecoil from "../recoil/renderWithRecoil";
import TodoApp from "./TodoApp";



describe('<TodoApp/>', () => {
  const setup = () => {
    renderWithRecoil(<TodoApp/>);
    
    const input = screen.getByTestId("TodoFormInput");
    const submitButton = screen.getByTestId('TodoFormButton')
    const todoList = screen.getByTestId('TodoList');

    return {
      input, submitButton, todoList
     };
  }
  
  it('todoProvider와 함께 렌더링 되는지 with sbumitbutton, todoList', () => {
    const {submitButton, todoList} = setup();
    expect(submitButton).toBeInTheDocument();
    expect(todoList).toBeInTheDocument();
  });


});