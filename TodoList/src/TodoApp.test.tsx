import { fireEvent, render, screen } from "@testing-library/react"
import TodoApp from "./TodoApp"

describe('<TodoApp/>', () => {

    it('todoform, todolist render', () => {
      render(<TodoApp/>)
      screen.getByTestId('TodoFormButton')
      screen.getByTestId('TodoList');
    })

    it('new todo', () => {
      render(<TodoApp/>)
      const input = screen.getByTestId("TodoFormInput")
      const button = screen.getByTestId("TodoFormButton")

      fireEvent.change(input, {
        target:{
          value: "new todo"
        }
      });
      fireEvent.click(button)
      
      screen.getByText('new todo');
    })

})