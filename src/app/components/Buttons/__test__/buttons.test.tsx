import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { useMainContext } from "@/app/context/MainContext";
import CharacterButtons from "../Buttons";

jest.mock("@/app/context/MainContext");

describe("CharacterButtons", () => {
  const deleteFirstCharacter = jest.fn();
  const deleteSecondCharacter = jest.fn();
  const deleteAllCharacters = jest.fn();

  beforeEach(() => {
    (useMainContext as jest.Mock).mockReturnValue({
      actions: {
        deleteFirstCharacter,
        deleteSecondCharacter,
        deleteAllCharacters,
      },
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should call deleteFirstCharacter when the first button is clicked", () => {
    const { getByText } = render(<CharacterButtons />);
    fireEvent.click(getByText("Deselect first character"));
    expect(deleteFirstCharacter).toHaveBeenCalled();
  });

  it("should call deleteSecondCharacter when the second button is clicked", () => {
    const { getByText } = render(<CharacterButtons />);
    fireEvent.click(getByText("Deselect second character"));
    expect(deleteSecondCharacter).toHaveBeenCalled();
  });

  it("should call deleteAllCharacters when the third button is clicked", () => {
    const { getByText } = render(<CharacterButtons />);
    fireEvent.click(getByText("Deselect both characters"));
    expect(deleteAllCharacters).toHaveBeenCalled();
  });
});
