import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { useMainContext } from "@/app/context/MainContext";
import CharacterDetailsAndEpisodes from "../CharacterDetailsAndEpisodes";
import "@testing-library/jest-dom";

jest.mock("@/app/context/MainContext");

describe("CharacterDetailsAndEpisodes", () => {
  const mockFetch = jest.fn();

  beforeEach(() => {
    global.fetch = mockFetch;
  });

  beforeAll(() => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => ({ results: [], info: { count: 0 } }),
    });
  });

  afterEach(() => {
    mockFetch.mockClear();
  });

  it("renders without crashing", () => {
    (useMainContext as jest.Mock).mockReturnValue({
      state: {
        firstCharacter: null,
        secondCharacter: null,
      },
      actions: {
        setAllEpisodes: jest.fn(),
      },
    });

    render(<CharacterDetailsAndEpisodes />);
    expect(screen.getByTestId("character-details")).toBeInTheDocument();
  });

  it("renders first character details when firstCharacter is present", () => {
    const firstCharacter = { id: 1, name: "Rick Sanchez" };
    (useMainContext as jest.Mock).mockReturnValue({
      state: {
        firstCharacter: {
          id: 1,
          name: "Rick Sanchez",
          status: "Alive",
          species: "Human",
          type: "",
          gender: "Male",
          origin: { name: "Earth", url: "" },
          location: { name: "Earth", url: "" },
          image: "",
          episode: [],
          url: "",
          created: "",
        },
        secondCharacter: null,
      },
      actions: {
        setAllEpisodes: jest.fn(),
      },
    });

    render(<CharacterDetailsAndEpisodes />);
    waitFor(() => {
      expect(screen.getByText(firstCharacter.name)).toBeInTheDocument();
    });
  });

  it("renders second character details when secondCharacter is present", () => {
    const secondCharacter = { id: 2, name: "Morty Smith" };
    (useMainContext as jest.Mock).mockReturnValue({
      state: {
        firstCharacter: null,
        secondCharacter: {
          id: 2,
          name: "Morty Smith",
          status: "Alive",
          species: "Human",
          type: "",
          gender: "Male",
          origin: { name: "Earth", url: "" },
          location: { name: "Earth", url: "" },
          image: "",
          episode: [],
          url: "",
          created: "",
        },
      },
      actions: {
        setAllEpisodes: jest.fn(),
      },
    });

    render(<CharacterDetailsAndEpisodes />);
    expect(screen.getByText(secondCharacter.name)).toBeInTheDocument();
  });

  it("renders EpisodesComparison component", () => {
    (useMainContext as jest.Mock).mockReturnValue({
      state: {
        firstCharacter: null,
        secondCharacter: null,
      },
      actions: {
        setAllEpisodes: jest.fn(),
      },
    });

    render(<CharacterDetailsAndEpisodes />);
    expect(screen.getByTestId("episodes-comparison")).toBeInTheDocument();
  });
});
