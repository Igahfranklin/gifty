import { render, screen } from "@testing-library/react";
import { ReceiveGift } from "../pages/receive";

// test if ReceiveGift component is working
describe("gifts", () => {
  test("gets the correct gift data", () => {
    render(<ReceiveGift />);
    const textElement = screen.findByText("Claim Gift");
    expect(textElement);
  });
});
