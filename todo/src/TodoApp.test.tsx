import { fireEvent, render, renderHook, screen } from "@testing-library/react"
import TodoApp from "./TodoApp"
import useTodo from "./recoil/hook/todoAtom"
import { RecoilRoot } from "recoil"
import useRender from "./hook/TDD/useRender"



describe('<TodoApp/>', () => {
    it('todoform, todolist render', () => {
      useRender(<TodoApp/>)
      screen.getByTestId('TodoFormButton')
      screen.getByTestId('TodoList');
    })

    it('new todo', () => {
      useRender(<TodoApp/>)
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