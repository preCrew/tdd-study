import { fireEvent, render, screen } from "@testing-library/react";
import TodoForm from "./TodoForm"

const inputs = [
  'TDD배우기1', '테스트 입력', 'inputs'
]
describe('<TodoForm/>', () => {
  
  it('<input>, <button> 렌더링 테스트', () => {
    render(<TodoForm />);
    const input = screen.getByPlaceholderText("할 일을 입력하세요");
    const button = screen.getByText('등록')
  });

  it('input 변경', () => {  
    render(<TodoForm />);
    const input = screen.getByPlaceholderText("할 일을 입력하세요");

    inputs.forEach(v => {
      fireEvent.change(input, {
        target: {
          value: v
        }
      });

      expect(input).toHaveAttribute('value', v);
    })
  });

  it('onInsert 함수가 불러지면 input값은 비워짐', () => {
    const onInsert = jest.fn();
    render(<TodoForm onInsert={onInsert}/>);


    const input = screen.getByPlaceholderText("할 일을 입력하세요");
    const button = screen.getByText('등록')
    
    fireEvent.change(input, {
      target: {
        value: 'TDD 배우기'
      }
    })
    fireEvent.click(button);
    expect(onInsert).toBeCalledWith('TDD 배우기')
    expect(input).toHaveAttribute('value', '');
  })
});
