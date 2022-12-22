import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter as Router } from "react-router-dom";
import "@testing-library/jest-dom";
import Home from "../pages/Home";

describe("landing page", () => {
  test("if button is clicked", async () => {
    render(
      <Router>
        <Home />
      </Router>
    );

    expect(
      await screen.findByRole("link", { name: /Send Gift/i })
    ).toBeInTheDocument();
  });
});
