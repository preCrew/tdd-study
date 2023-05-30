import { render, screen } from "@testing-library/react"
import Test1 from "./Test1"
import userEvent from "@testing-library/user-event";

describe('Test1', () => {
  it('render 0', () => {
    render(<Test1/>);

    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('click button, plus 1', async () => {
    render(<Test1/>);
    const button = screen.getByTestId("plusButton");
    await userEvent.click(button);
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
  })
})