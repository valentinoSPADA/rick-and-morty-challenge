import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CharacterDetail from "../CharacterDetail";
import "@testing-library/jest-dom";
import { Character } from "@/app/types/Character.types";

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
  episode: ["https://rickandmortyapi.com/api/episode/1"],
  url: "https://rickandmortyapi.com/api/character/1",
  created: "2017-11-04T18:48:46.250Z",
};

describe("CharacterDetail", () => {
  it("renders character details correctly", () => {
    render(<CharacterDetail character={character} characterNumber={1} />);
    expect(screen.getByText("Rick Sanchez")).toBeInTheDocument();
    expect(
      screen.getByText((content, element) => {
        return element?.textContent === "Status: Alive";
      })
    ).toBeInTheDocument();
    expect(
      screen.getByText((content, element) => {
        return element?.textContent === "Species: Human";
      })
    ).toBeInTheDocument();
    expect(
      screen.getByText((content, element) => {
        return element?.textContent === "Gender: Male";
      })
    ).toBeInTheDocument();
    expect(
      screen.getByText((content, element) => {
        return element?.textContent === "Origin: Earth (C-137)";
      })
    ).toBeInTheDocument();
    expect(
      screen.getByText((content, element) => {
        return (
          element?.textContent === "Location: Earth (Replacement Dimension)"
        );
      })
    ).toBeInTheDocument();
    expect(
      screen.getByText((content, element) => {
        return element?.textContent === "Created: 4/11/2017";
      })
    ).toBeInTheDocument();
  });

  it("shows episodes popup when 'Show Episodes' button is clicked", () => {
    render(<CharacterDetail character={character} characterNumber={1} />);
    const button = screen.getByText("Show Episodes");
    waitFor(() => {
      fireEvent.click(button);
      expect(screen.getByText("Episodes")).toBeInTheDocument();
    });
  });

  it("hides episodes popup when 'Close' button is clicked", () => {
    render(<CharacterDetail character={character} characterNumber={2} />);
    const button = screen.getByText("Show Episodes");
    waitFor(() => {
      fireEvent.click(button);
      const closeButton = screen.getByText("Close");
      waitFor(() => {
        fireEvent.click(closeButton);
        expect(screen.queryByText("Episodes")).not.toBeInTheDocument();
      });
    });
  });

  it("disables body scroll when episodes popup is shown", () => {
    render(<CharacterDetail character={character} characterNumber={1} />);
    const button = screen.getByText("Show Episodes");
    waitFor(() => {
      fireEvent.click(button);
      expect(document.body.style.overflowY).toBe("hidden");
    });
  });

  it("enables body scroll when episodes popup is hidden", () => {
    render(<CharacterDetail character={character} characterNumber={2} />);
    const button = screen.getByText("Show Episodes");
    waitFor(() => {
      fireEvent.click(button);
      const closeButton = screen.getByText("Close");
      waitFor(() => {
        fireEvent.click(closeButton);
        expect(document.body.style.overflowY).toBe("scroll");
      });
    });
  });
});
