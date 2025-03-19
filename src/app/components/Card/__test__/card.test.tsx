import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Card from "../Card";
import { Character } from "@/app/types/Character.types";
import "@testing-library/jest-dom";

const character: Character = {
  id: 1,
  name: "Rick Sanchez",
  status: "Alive",
  species: "Human",
  type: "",
  gender: "Male",
  origin: { name: "Earth (C-137)", url: "" },
  location: { name: "Earth (Replacement Dimension)", url: "" },
  image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
  episode: [],
  url: "",
  created: "",
};

describe("Card Component", () => {
  test("renders character information", () => {
    render(
      <Card
        character={character}
        onSelect={() => {}}
        isFirstCharacter={false}
        isSecondCharacter={false}
      />
    );

    expect(screen.getByText(character.name)).toBeInTheDocument();
    expect(screen.getByText(`Status: ${character.status}`)).toBeInTheDocument();
    expect(
      screen.getByText(`Species: ${character.species}`)
    ).toBeInTheDocument();
    expect(screen.getByText(`Gender: ${character.gender}`)).toBeInTheDocument();
  });

  test("calls onSelect when button is clicked", () => {
    const onSelectMock = jest.fn();
    render(
      <Card
        character={character}
        onSelect={onSelectMock}
        isFirstCharacter={false}
        isSecondCharacter={false}
      />
    );

    fireEvent.click(screen.getByText("Select"));
    expect(onSelectMock).toHaveBeenCalledWith(character);
  });

  test("disables button when character is already selected", () => {
    render(
      <Card
        character={character}
        onSelect={() => {}}
        isFirstCharacter={true}
        isSecondCharacter={false}
      />
    );

    expect(screen.getByText("Select")).toBeDisabled();
  });

  test("applies correct styles for first character", () => {
    render(
      <Card
        character={character}
        onSelect={() => {}}
        isFirstCharacter={true}
        isSecondCharacter={false}
      />
    );

    expect(screen.getByText("1")).toBeInTheDocument();
  });

  test("applies correct styles for second character", () => {
    render(
      <Card
        character={character}
        onSelect={() => {}}
        isFirstCharacter={false}
        isSecondCharacter={true}
      />
    );

    expect(screen.getByText("2")).toBeInTheDocument();
  });
});
