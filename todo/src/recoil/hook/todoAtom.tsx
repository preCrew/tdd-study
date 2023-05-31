import { useRecoilState } from "recoil"
import { todoState } from "../atom"

const useTodo = () => {
    const [todo,setTodo] = useRecoilState(todoState);

    return {
        todo,
        setTodo
    }
}

export default useTodo;