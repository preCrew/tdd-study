import { useState} from 'react'

interface TtodoForm {
  onSubmit: (value: string) => void;
}

const TodoForm = ({onSubmit}: TtodoForm) => {
  const [value,setValue] = useState('')

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }
  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (value) {
      onSubmit(value);
      setValue('');
    }else {
      alert("값을 입력해주세요");
    }
  }
  
  return <>
    <form  onSubmit={handleOnSubmit}>
        <input
          data-testid="TodoFormInput"
          placeholder="할 일을 입력"
          onChange={handleOnChange}
          value={value}
          />
        <button data-testid="TodoFormButton">등록</button>
    </form>
  </>;
}
export default TodoForm;