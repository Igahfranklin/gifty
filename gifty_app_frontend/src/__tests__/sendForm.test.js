import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { MemoryRouter as Router } from "react-router-dom";
import { SendForm } from "../pages/send";

describe("test send form component", () => {
  test("if all input fields are not empty and validated", async () => {
    render(
      <Router>
        <SendForm />
      </Router>
    );

    expect(
      await screen.findByRole("button", { name: /Send Gift/i })
    ).toBeDisabled();
    userEvent.type(
      await screen.findByPlaceholderText(/Enter a name the receiver knows/i),
      "recievers name"
    );
    userEvent.type(
      await screen.findByPlaceholderText(/Enter your email/i),
      "sender email"
    );
    userEvent.type(await screen.findByTestId(/amount/i));
    userEvent.type(await screen.findByTestId("terms"));
    expect(
      await screen.findByRole("button", { name: /Send Gift/i })
    ).toBeEnabled();
  });
});
