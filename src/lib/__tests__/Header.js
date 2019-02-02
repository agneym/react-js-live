import React from "react";
import { render, cleanup, fireEvent } from "react-testing-library";

import Header from "../Header";

afterEach(cleanup);

describe("Header", () => {
  it("should fire click actions", () => {
    const onClick = jest.fn(() => {});
    const { getByText } = render(<Header onChange={onClick} />);
    const JSBtn = getByText("JS");
    const ConsoleBtn = getByText("Console");
    fireEvent.click(JSBtn);
    fireEvent.click(ConsoleBtn);
    expect(onClick.mock.calls.length).toBe(2);
  });

  it("should marks active", () => {
    const onClick = () => {};
    const { getByText } = render(
      <Header activeCode="html" onChange={onClick} />
    );
    const HTMLBtn = getByText("HTML");
    expect(HTMLBtn.classList.contains("activeTabBtn")).toBeTruthy();
  });
});
