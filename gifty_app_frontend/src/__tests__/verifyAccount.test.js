import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter as Router } from "react-router-dom";
import "@testing-library/jest-dom";
import { VerifyAccount } from "../pages/receive";

describe("verify account", () => {
  test("if otp was entered", async () => {
    render(
      <Router>
        <VerifyAccount />
      </Router>
    );
    // expect(
    //   await screen.findByRole("button", { name: /verify account/i })
    // ).toBeDisabled();
  });
});
