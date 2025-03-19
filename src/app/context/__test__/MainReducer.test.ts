import { reducer } from "../Reducer/MainReducer";
import { CharacterStateType, CharacterActions } from "../MainContext.types";

describe("MainReducer", () => {
  const initialState: CharacterStateType = {
    firstCharacter: null,
    secondCharacter: null,
    episodes: [],
  };

  it("should set the first character", () => {
    const action = {
      type: CharacterActions.SET_FIRST_CHARACTER,
      payload: { id: 1, name: "Rick Sanchez" },
    };
    const newState = reducer(initialState, action);
    expect(newState.firstCharacter).toEqual(action.payload);
  });

  it("should set the second character", () => {
    const action = {
      type: CharacterActions.SET_SECOND_CHARACTER,
      payload: { id: 2, name: "Morty Smith" },
    };
    const newState = reducer(initialState, action);
    expect(newState.secondCharacter).toEqual(action.payload);
  });

  it("should delete the first character", () => {
    const stateWithFirstCharacter = {
      ...initialState,
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
    };
    const action = { type: CharacterActions.DELETE_FIRST_CHARACTER };
    const newState = reducer(stateWithFirstCharacter, action);
    expect(newState.firstCharacter).toBeNull();
  });

  it("should delete the second character", () => {
    const stateWithSecondCharacter = {
      ...initialState,
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
    };
    const action = { type: CharacterActions.DELETE_SECOND_CHARACTER };
    const newState = reducer(stateWithSecondCharacter, action);
    expect(newState.secondCharacter).toBeNull();
  });

  it("should delete all characters", () => {
    const stateWithCharacters = {
      ...initialState,
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
    };
    const action = { type: CharacterActions.DELETE_ALL_CHARACTERS };
    const newState = reducer(stateWithCharacters, action);
    expect(newState.firstCharacter).toBeNull();
    expect(newState.secondCharacter).toBeNull();
  });

  it("should set all episodes", () => {
    const action = {
      type: CharacterActions.SET_ALL_EPISODES,
      payload: [
        { id: 1, name: "Pilot" },
        { id: 2, name: "Lawnmower Dog" },
      ],
    };
    const newState = reducer(initialState, action);
    expect(newState.episodes).toEqual(action.payload);
  });

  it("should return the initial state for unknown action types", () => {
    const action = { type: "UNKNOWN_ACTION" } as any;
    const newState = reducer(initialState, action);
    expect(newState).toEqual(initialState);
  });
});
