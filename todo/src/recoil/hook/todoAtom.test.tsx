import { renderHook } from "@testing-library/react"
import { RecoilRoot } from "recoil"
import useTodo from "./todoAtom"

//todo state값이 작성됬는지
it('useTodo test', () => {
    const { result } = renderHook(() => useTodo(), {
        wrapper: RecoilRoot,
    })
    expect(result.current).toBeDefined()
})