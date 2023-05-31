import { render } from "@testing-library/react"
import { RecoilRoot } from "recoil"

const useRender = (conmponent: React.ReactNode) => {
    return render(
        <RecoilRoot>
        {conmponent}
        </RecoilRoot>
    )
}

export default useRender;