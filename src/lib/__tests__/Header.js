import React from "react";
import { render, cleanup, fireEvent } from "react-testing-library";

import Header from "../Header";

afterEach(cleanup);

describe("Header", () => {
  it("should fire click actions", () => {
    const onClick = jest.fn(() => {});
    const { getByText } = render(
      <Header
        active={null}
        tabs={[{ label: "test", value: "test" }]}
        onChange={onClick}
      />
    );
    const testBtn = getByText("test");
    fireEvent.click(testBtn);
    expect(onClick.mock.calls.length).toBe(1);
  });

  it("should mark active", () => {
    const onClick = () => {};
    const { getByText } = render(
      <Header
        active="html"
        tabs={[{ label: "html", value: "html" }]}
        onChange={onClick}
      />
    );
    const HTMLBtn = getByText("html");
    expect(HTMLBtn.classList.contains("activeTabBtn")).toBeTruthy();
  });
});
