// Imports
import { describe, it, expect } from "vitest";

import App from "./App";

import { render, screen } from "@testing-library/react";

// Tests
describe("Renders main page correctly", async () => {
  it("Should render the page correctly", async () => {
    render(<App />);

    expect(screen.getByText("My Task")).toBeInTheDocument();
  });
});
