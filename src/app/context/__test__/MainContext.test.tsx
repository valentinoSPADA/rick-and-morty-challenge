import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import CharacterProvider, { useMainContext } from "../MainContext";
import { Character } from "@/app/types/Character.types";

const TestComponent = () => {
  const { state, actions } = useMainContext();
  return (
    <div>
      <button
        onClick={() =>
          actions.setFirstCharacter({ id: 1, name: "Rick" } as Character)
        }
      >
        Set First Character
      </button>
      <button
        onClick={() =>
          actions.setSecondCharacter({ id: 2, name: "Morty" } as Character)
        }
      >
        Set Second Character
      </button>
      <button onClick={actions.deleteFirstCharacter}>
        Delete First Character
      </button>
      <button onClick={actions.deleteSecondCharacter}>
        Delete Second Character
      </button>
      <button onClick={actions.deleteAllCharacters}>
        Delete All Characters
      </button>
      <button
        onClick={() =>
          actions.setAllEpisodes([{ id: 1, name: "Episode 1" }] as Character[])
        }
      >
        Set All Episodes
      </button>
      <div data-testid="state">{JSON.stringify(state)}</div>
    </div>
  );
};

describe("CharacterProvider", () => {
  it("should set the first character", () => {
    render(
      <CharacterProvider>
        <TestComponent />
      </CharacterProvider>
    );
    screen.getByText("Set First Character").click();
    waitFor(() => {
      expect(screen.getByTestId("state").textContent).toContain(
        "'id':1,'name':'Rick'"
      );
    });
  });

  it("should set the second character", () => {
    render(
      <CharacterProvider>
        <TestComponent />
      </CharacterProvider>
    );
    screen.getByText("Set Second Character").click();
    waitFor(() => {
      expect(screen.getByTestId("state").textContent).toContain(
        "'id':2,'name':'Morty'"
      );
    });
  });

  it("should delete the first character", () => {
    render(
      <CharacterProvider>
        <TestComponent />
      </CharacterProvider>
    );
    screen.getByText("Set First Character").click();
    screen.getByText("Delete First Character").click();
    expect(screen.getByTestId("state").textContent).not.toContain(
      "'id':1,'name':'Rick'"
    );
  });

  it("should delete the second character", () => {
    render(
      <CharacterProvider>
        <TestComponent />
      </CharacterProvider>
    );
    screen.getByText("Set Second Character").click();
    screen.getByText("Delete Second Character").click();
    expect(screen.getByTestId("state").textContent).not.toContain(
      "'id':2,'name':'Morty'"
    );
  });

  it("should delete all characters", () => {
    render(
      <CharacterProvider>
        <TestComponent />
      </CharacterProvider>
    );
    screen.getByText("Set First Character").click();
    screen.getByText("Set Second Character").click();
    screen.getByText("Delete All Characters").click();
    expect(screen.getByTestId("state").textContent).not.toContain(
      "'id':1,'name':'Rick'"
    );
    expect(screen.getByTestId("state").textContent).not.toContain(
      "'id':2,'name':'Morty'"
    );
  });

  it("should set all episodes", () => {
    render(
      <CharacterProvider>
        <TestComponent />
      </CharacterProvider>
    );
    screen.getByText("Set All Episodes").click();
    waitFor(() => {
      expect(screen.getByTestId("state").textContent).toContain(
        "'id':1,'name':'Episode 1'"
      );
    });
  });
});
