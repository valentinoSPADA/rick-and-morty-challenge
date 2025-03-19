import {
  CharacterStateType,
  ActionType,
  CharacterActions,
} from "../MainContext.types";
import { produce } from "immer";

export const reducer = produce(
  (state: CharacterStateType, action: ActionType): CharacterStateType => {
    switch (action.type) {
      case CharacterActions.SET_FIRST_CHARACTER: {
        state.firstCharacter = action.payload;
        return state;
      }
      case CharacterActions.SET_SECOND_CHARACTER: {
        state.secondCharacter = action.payload;
        return state;
      }
      case CharacterActions.DELETE_FIRST_CHARACTER: {
        state.firstCharacter = null;
        return state;
      }
      case CharacterActions.DELETE_SECOND_CHARACTER: {
        state.secondCharacter = null;
        return state;
      }
      case CharacterActions.DELETE_ALL_CHARACTERS: {
        state.firstCharacter = null;
        state.secondCharacter = null;
        return state;
      }
      case CharacterActions.SET_ALL_EPISODES: {
        state.episodes = action.payload;
        return state;
      }
      default:
        return state;
    }
  }
);
