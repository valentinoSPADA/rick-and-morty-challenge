import { getCharacters, getEpisodes } from "../fetchUtils";
import { getEpisodesBySeason } from "../episodesUtils";
import { Episode } from "../../types/Episode.types";

describe("fetchUtils", () => {
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
  test("getCharacters fetches characters successfully", async () => {
    const mockData = { results: [{ id: 1, name: "Rick Sanchez" }] };
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    const data = await getCharacters(1);
    expect(data).toEqual(mockData);
    expect(mockFetch).toHaveBeenCalledWith(
      "https://rickandmortyapi.com/api/character/?page=1"
    );
  });

  test("getCharacters handles fetch error", async () => {
    mockFetch.mockRejectedValue(new Error("Network response was not ok"));

    await expect(getCharacters(1)).rejects.toThrow(
      "Network response was not ok"
    );
  });

  test("getEpisodes fetches episodes successfully", async () => {
    const mockData = { results: [{ id: 1, name: "Pilot" }] };
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    const data = await getEpisodes("page=1");
    expect(data).toEqual(mockData);
    expect(mockFetch).toHaveBeenCalledWith(
      "https://rickandmortyapi.com/api/episode?page=1"
    );
  });

  test("getEpisodes handles fetch error", async () => {
    mockFetch.mockRejectedValue(new Error("Network response was not ok"));

    await expect(getEpisodes("page=1")).rejects.toThrow(
      "Network response was not ok"
    );
  });
});

describe("episodesUtils", () => {
  test("getEpisodesBySeason groups episodes by season", () => {
    const episodes: Episode[] = [
      {
        id: 1,
        name: "Pilot",
        episode: "S01E01",
        url: "url1",
        air_date: "December 2, 2013",
        characters: [],
        created: "2017-11-10T12:56:33.798Z",
      },
      {
        id: 2,
        name: "Lawnmower Dog",
        episode: "S01E02",
        url: "url2",
        air_date: "December 9, 2013",
        characters: [],
        created: "2017-11-10T12:56:33.798Z",
      },
      {
        id: 3,
        name: "Auto Erotic Assimilation",
        episode: "S02E03",
        url: "url3",
        air_date: "August 9, 2015",
        characters: [],
        created: "2017-11-10T12:56:33.798Z",
      },
    ];
    const stringEpisodes = ["url1", "url2", "url3"];

    const result = getEpisodesBySeason(stringEpisodes, episodes);

    expect(result).toEqual({
      "1": [
        {
          id: 1,
          name: "Pilot",
          episode: "S01E01",
          url: "url1",
          air_date: "December 2, 2013",
          characters: [],
          created: "2017-11-10T12:56:33.798Z",
        },
        {
          id: 2,
          name: "Lawnmower Dog",
          episode: "S01E02",
          url: "url2",
          air_date: "December 9, 2013",
          characters: [],
          created: "2017-11-10T12:56:33.798Z",
        },
      ],
      "2": [
        {
          id: 3,
          name: "Auto Erotic Assimilation",
          episode: "S02E03",
          url: "url3",
          air_date: "August 9, 2015",
          characters: [],
          created: "2017-11-10T12:56:33.798Z",
        },
      ],
    });
  });

  test("getEpisodesBySeason handles empty input", () => {
    const episodes: Episode[] = [];
    const stringEpisodes: string[] = [];

    const result = getEpisodesBySeason(stringEpisodes, episodes);

    expect(result).toEqual({});
  });

  test("getEpisodesBySeason handles missing episodes", () => {
    const episodes: Episode[] = [
      {
        id: 1,
        name: "Pilot",
        episode: "S01E01",
        url: "url1",
        air_date: "December 2, 2013",
        characters: [],
        created: "2017-11-10T12:56:33.798Z",
      },
    ];
    const stringEpisodes = ["url1", "url2"];

    const result = getEpisodesBySeason(stringEpisodes, episodes);

    expect(result).toEqual({
      "1": [
        {
          id: 1,
          name: "Pilot",
          episode: "S01E01",
          url: "url1",
          air_date: "December 2, 2013",
          characters: [],
          created: "2017-11-10T12:56:33.798Z",
        },
      ],
    });
  });
});
