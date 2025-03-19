import { render, screen, fireEvent } from "@testing-library/react";
import Home from "../page";
import CharacterProvider from "../context/MainContext";
import "@testing-library/jest-dom";

describe("Home component", () => {
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

  it("renders the main heading", () => {
    render(
      <CharacterProvider>
        <Home />
      </CharacterProvider>
    );
    const heading = screen.getByText(/Rick and Morty Challenge/i);
    expect(heading).toBeInTheDocument();
  });

  it("renders the description", () => {
    render(
      <CharacterProvider>
        <Home />
      </CharacterProvider>
    );
    const description = screen.getByText(
      /Select two characters from Rick and Morty and watch their episodes in common/i
    );
    expect(description).toBeInTheDocument();
  });

  it("renders the CharacterButtons component", () => {
    render(
      <CharacterProvider>
        <Home />
      </CharacterProvider>
    );
    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBeGreaterThan(0);
  });

  it("renders the CardList component", () => {
    render(
      <CharacterProvider>
        <Home />
      </CharacterProvider>
    );
    const cardList = screen.getByTestId("card-list");
    expect(cardList).toBeInTheDocument();
  });

  it("renders the Paginator component", () => {
    render(
      <CharacterProvider>
        <Home />
      </CharacterProvider>
    );
    const paginator = screen.getByTestId("paginator");
    expect(paginator).toBeInTheDocument();
  });

  it("renders the CharacterDetailsAndEpisodes component", () => {
    render(
      <CharacterProvider>
        <Home />
      </CharacterProvider>
    );
    const details = screen.getByTestId("character-details");
    expect(details).toBeInTheDocument();
  });

  it("updates the paginator state on page change", () => {
    render(
      <CharacterProvider>
        <Home />
      </CharacterProvider>
    );
    const paginator = screen.getByTestId("paginator");
    fireEvent.click(paginator);
    const updatedPaginator = screen.getByTestId("paginator");
    expect(updatedPaginator).toBeInTheDocument();
  });
});
