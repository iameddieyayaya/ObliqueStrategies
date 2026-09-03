import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

test("renders the loading state", () => {
  const { getByText } = render(<App />);
  expect(getByText(/loading/i)).toBeInTheDocument();
});
