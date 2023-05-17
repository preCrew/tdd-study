import { useState} from 'react'

interface TtodoForm {
  onInsert?: any
}

const TodoForm = ({onInsert}: TtodoForm) => {
  const [value,setValue] = useState('')

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value)
    setValue(e.target.value);
  }
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    onInsert(value);
    setValue('');
    e.preventDefault();
  }
  
  return <>
    <form  onSubmit={onSubmit}>
        <input
          placeholder="할 일을 입력하세요"
          data-testid="TodoFormInput"
          onChange={onChange}
          value={value}
          />
        <button data-testid="TodoFormButton">등록</button>
    </form>
  </>;
}
export default TodoForm;