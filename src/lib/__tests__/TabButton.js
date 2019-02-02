import React from "react";
import TabButton from "../TabButton";
import { render, cleanup, fireEvent } from "react-testing-library";

afterEach(cleanup);

describe("Tab Change", () => {
  it("renders button text", () => {
    const { getByText } = render(
      <TabButton onClick={() => {}}>button</TabButton>
    );
    const el = getByText("button");
    expect(el).toBeTruthy();
  });

  it("fires on click", () => {
    const onClick = jest.fn(() => {});
    const { getByText } = render(
      <TabButton onClick={onClick}>button</TabButton>
    );
    const el = getByText("button");
    fireEvent.click(el);
    expect(onClick).toHaveBeenCalled();
  });
});
