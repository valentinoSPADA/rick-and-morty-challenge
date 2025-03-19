import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Paginator from "../Paginator";
import "@testing-library/jest-dom";

describe("Paginator", () => {
  const totalItems = 100;
  const itemsPerPage = 10;
  const onSelectedPage = jest.fn();

  it("renders correctly", () => {
    const { getByTestId } = render(
      <Paginator
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        onSelectedPage={onSelectedPage}
      />
    );
    expect(getByTestId("paginator")).toBeInTheDocument();
  });

  it("disables the previous button on the first page", () => {
    const { getByText } = render(
      <Paginator
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        onSelectedPage={onSelectedPage}
      />
    );
    expect(getByText("Prev")).toBeDisabled();
  });

  it("disables the next button on the last page", () => {
    const { getByText } = render(
      <Paginator
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        onSelectedPage={onSelectedPage}
      />
    );
    fireEvent.click(getByText("Next"));
    fireEvent.click(getByText("Next"));
    fireEvent.click(getByText("Next"));
    fireEvent.click(getByText("Next"));
    fireEvent.click(getByText("Next"));
    fireEvent.click(getByText("Next"));
    fireEvent.click(getByText("Next"));
    fireEvent.click(getByText("Next"));
    fireEvent.click(getByText("Next"));
    expect(getByText("Next")).toBeDisabled();
  });

  it("calls onSelectedPage with the correct page number when next is clicked", () => {
    const { getByText } = render(
      <Paginator
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        onSelectedPage={onSelectedPage}
      />
    );
    fireEvent.click(getByText("Next"));
    expect(onSelectedPage).toHaveBeenCalledWith(2);
  });

  it("calls onSelectedPage with the correct page number when previous is clicked", () => {
    const { getByText } = render(
      <Paginator
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        onSelectedPage={onSelectedPage}
      />
    );
    fireEvent.click(getByText("Next"));
    fireEvent.click(getByText("Prev"));
    expect(onSelectedPage).toHaveBeenCalledWith(1);
  });

  it("displays the correct current page and total pages", () => {
    const { getByText } = render(
      <Paginator
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        onSelectedPage={onSelectedPage}
      />
    );
    expect(getByText("1 of 10")).toBeInTheDocument();
    fireEvent.click(getByText("Next"));
    expect(getByText("2 of 10")).toBeInTheDocument();
  });
});
