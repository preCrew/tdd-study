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

  it('input의 값을 변경했을 때', async () => {  
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

  it('button을 눌렀을 때 input이 빈값이라면 에러표시가 되고 onSubmit이 실행되지 않아야함.', async () => {
    const {button, onSubmit} = setup();
    window.alert = jest.fn();

    await userEvent.click(button);
    expect(window.alert).toBeCalledWith('값을 입력해주세요');
    expect(onSubmit).not.toBeCalled();
  })
});