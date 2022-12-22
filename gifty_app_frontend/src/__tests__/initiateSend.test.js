import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { createMemoryHistory } from "@remix-run/router";
import { MemoryRouter as Router } from "react-router-dom";
import { InitiateSend } from "../pages/send";
import userEvent from "@testing-library/user-event";

describe("initiate send component", () => {
  test("check document contains only three(3) buttons", async () => {
    render(
      <Router>
        <InitiateSend />
      </Router>
    );
    const buttonList = await screen.findAllByRole("button");
    expect(buttonList).toHaveLength(3);
  });
  test("check document contains all buttons", () => {
    render(
      <Router>
        <InitiateSend />
      </Router>
    );
    const SendWithEmail = screen.getByRole("button", {
      name: /Send with Email/i,
    });
    const SendWithPhoneNumber = screen.getByRole("button", {
      name: /Send with Phone Number/i,
    });
    const SendWithInstagram = screen.getByRole("button", {
      name: /Send with Instagram/i,
    });

    expect(SendWithEmail).toBeInTheDocument();
    expect(SendWithPhoneNumber).toBeInTheDocument();
    expect(SendWithInstagram).toBeInTheDocument();
  });

  //   email Btn
  test("check if email button redirects when clicked ", async () => {
    const history = createMemoryHistory({ initialEntries: ["/"] });
    render(
      <Router>
        <InitiateSend history={history} />
      </Router>
    );
    const SendWithEmailBtn = await screen.findByRole("button", {
      name: /Send with Email/i,
    });
    userEvent.click(SendWithEmailBtn);
    await waitFor(() => {
      expect(history.location.pathname).toEqual("/");
    });
  });
  //   phone Btn
  test("check if phone button redirects when clicked ", async () => {
    const history = createMemoryHistory({ initialEntries: ["/"] });
    render(
      <Router>
        <InitiateSend history={history} />
      </Router>
    );
    const SendWithPhoneBtn = await screen.findByRole("button", {
      name: /Send with Phone Number/i,
    });
    userEvent.click(SendWithPhoneBtn);
    await waitFor(() => {
      expect(history.location.pathname).toEqual("/");
    });
  });
  //   instagram Btn
  test("check if phone button redirects when clicked ", async () => {
    const history = createMemoryHistory({ initialEntries: ["/"] });
    render(
      <Router>
        <InitiateSend history={history} />
      </Router>
    );
    const SendWithInstagramBtn = await screen.findByRole("button", {
      name: /Send with Instagram/i,
    });
    userEvent.click(SendWithInstagramBtn);
    await waitFor(() => {
      expect(history.location.pathname).toEqual("/");
    });
  });
});
