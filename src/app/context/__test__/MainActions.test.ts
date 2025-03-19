import {
  setFirstCharacterAction,
  setSecondCharacterAction,
  deleteFirstCharacterAction,
  deleteSecondCharacterAction,
  deleteAllCharactersAction,
  setAllEpisodesAction,
} from "../Reducer/MainActions";
import { CharacterActions } from "../MainContext.types";
import { Character } from "@/app/types/Character.types";

describe("CharacterActions", () => {
  let dispatch: jest.Mock;

  beforeEach(() => {
    dispatch = jest.fn();
  });

  it("should dispatch SET_FIRST_CHARACTER action", async () => {
    const character: Character = {
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
    };
    await setFirstCharacterAction(dispatch, character);
    expect(dispatch).toHaveBeenCalledWith({
      type: CharacterActions.SET_FIRST_CHARACTER,
      payload: character,
    });
  });

  it("should dispatch SET_SECOND_CHARACTER action", () => {
    const character: Character = {
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
    };
    setSecondCharacterAction(dispatch, character);
    expect(dispatch).toHaveBeenCalledWith({
      type: CharacterActions.SET_SECOND_CHARACTER,
      payload: character,
    });
  });

  it("should dispatch DELETE_FIRST_CHARACTER action", () => {
    deleteFirstCharacterAction(dispatch);
    expect(dispatch).toHaveBeenCalledWith({
      type: CharacterActions.DELETE_FIRST_CHARACTER,
    });
  });

  it("should dispatch DELETE_SECOND_CHARACTER action", () => {
    deleteSecondCharacterAction(dispatch);
    expect(dispatch).toHaveBeenCalledWith({
      type: CharacterActions.DELETE_SECOND_CHARACTER,
    });
  });

  it("should dispatch DELETE_ALL_CHARACTERS action", () => {
    deleteAllCharactersAction(dispatch);
    expect(dispatch).toHaveBeenCalledWith({
      type: CharacterActions.DELETE_ALL_CHARACTERS,
    });
  });

  it("should dispatch SET_ALL_EPISODES action", () => {
    const episodes: Character[] = [
      {
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
      {
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
    ];
    setAllEpisodesAction(dispatch, episodes);
    expect(dispatch).toHaveBeenCalledWith({
      type: CharacterActions.SET_ALL_EPISODES,
      payload: episodes,
    });
  });
});
