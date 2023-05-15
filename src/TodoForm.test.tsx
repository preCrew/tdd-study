import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TodoForm from "./TodoForm"

describe('<TodoForm/>', () => {
  
  const setup = () => {
    const onSubmit = jest.fn();
    render(<TodoForm onSubmit={onSubmit}/>);
    const input = screen.getByTestId('TodoFormInput') as HTMLInputElement;
    const button = screen.getByTestId('TodoFormButton') as HTMLButtonElement;
    return {
      input, button, onSubmit
    };
  }
  
  it('<input>, <button> 렌더링 테스트', () => {
    const {input, button} = setup();
    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it('input 변경', async () => {  
    const {input} = setup();
    const inputVal = 'test input';

    await userEvent.type(input, inputVal);
    expect(input.value).toBe(inputVal);
  });

  it('onInsert 함수가 불러지면 input값은 비워짐', async () => {
    const {input, button, onSubmit} = setup();
    const inputVal = 'test input Val';
    
    await userEvent.type(input, inputVal);
    await userEvent.click(button);

    expect(onSubmit).toBeCalledWith(inputVal)
    expect(input.value).toBe("");
  })
});