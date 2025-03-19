import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CardList, { CardListProps } from "../CardList";
import { useMainContext } from "@/app/context/MainContext";
import { getCharacters } from "@/app/utils/fetchUtils";
import { Character } from "@/app/types/Character.types";
import "@testing-library/jest-dom";

jest.mock("@/app/context/MainContext");
jest.mock("@/app/utils/fetchUtils");

const mockSetFirstCharacter = jest.fn();
const mockSetSecondCharacter = jest.fn();
const mockSetPaginator = jest.fn();

const mockContext = {
  actions: {
    setFirstCharacter: mockSetFirstCharacter,
    setSecondCharacter: mockSetSecondCharacter,
  },
  state: {
    firstCharacter: null as Character | null,
    secondCharacter: null as Character | null,
  },
};

const mockCharacters: Character[] = [
  {
    id: 1,
    name: "Rick Sanchez",
    status: "Alive",
    species: "Human",
    gender: "Male",
    origin: { name: "Earth", url: "" },
    location: { name: "Earth", url: "" },
    image: "https://example.com/image_url",
    type: "",
    episode: [],
    url: "",
    created: "",
  },
  {
    id: 2,
    name: "Morty Smith",
    status: "Alive",
    species: "Human",
    gender: "Male",
    origin: { name: "Earth", url: "" },
    location: { name: "Earth", url: "" },
    image: "https://example.com/image_url",
    type: "",
    episode: [],
    url: "",
    created: "",
  },
];

describe("CardList", () => {
  beforeEach(() => {
    (useMainContext as jest.Mock).mockReturnValue(mockContext);
    (getCharacters as jest.Mock).mockResolvedValue({
      info: { count: 2 },
      results: mockCharacters,
    });
  });

  it("renders without crashing", async () => {
    render(<CardList actualPage={1} setPaginator={mockSetPaginator} />);
    expect(screen.getByTestId("card-list")).toBeInTheDocument();
  });

  it("displays characters", async () => {
    render(<CardList actualPage={1} setPaginator={mockSetPaginator} />);
    expect(await screen.findByText("Rick Sanchez")).toBeInTheDocument();
    expect(await screen.findByText("Morty Smith")).toBeInTheDocument();
  });

  it("selects the first character", async () => {
    render(<CardList actualPage={1} setPaginator={mockSetPaginator} />);
    const rickCard = await screen.findByText("Rick Sanchez");
    fireEvent.click(rickCard);
    waitFor(() => {
      expect(mockSetFirstCharacter).toHaveBeenCalledWith(mockCharacters[0]);
    });
  });

  it("selects the second character", async () => {
    mockContext.state.firstCharacter = mockCharacters[0];
    render(<CardList actualPage={1} setPaginator={mockSetPaginator} />);
    const mortyCard = await screen.findByText("Morty Smith");
    fireEvent.click(mortyCard);
    waitFor(() => {
      expect(mockSetSecondCharacter).toHaveBeenCalledWith(mockCharacters[1]);
    });
  });

  it("shows error popup when selecting more than two characters", async () => {
    mockContext.state.firstCharacter = mockCharacters[0];
    mockContext.state.secondCharacter = mockCharacters[1];
    render(<CardList actualPage={1} setPaginator={mockSetPaginator} />);
    const rickCard = await screen.findByText("Rick Sanchez");
    fireEvent.click(rickCard);
    waitFor(() => {
      expect(
        screen.findByText("You need to deselect at least 1 character.")
      ).toBeInTheDocument();
    });
  });
});
