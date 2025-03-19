import { Character } from "@/app/types/Character.types";
import { ActionType, CharacterActions } from "../MainContext.types";

export const setFirstCharacterAction = async (
  dispatch: React.Dispatch<ActionType>,
  character: Character
) => {
  dispatch({ type: CharacterActions.SET_FIRST_CHARACTER, payload: character });
};

export const setSecondCharacterAction = (
  dispatch: React.Dispatch<ActionType>,
  character: Character
) => {
  dispatch({ type: CharacterActions.SET_SECOND_CHARACTER, payload: character });
};

export const deleteFirstCharacterAction = (
  dispatch: React.Dispatch<ActionType>
) => {
  dispatch({ type: CharacterActions.DELETE_FIRST_CHARACTER });
};

export const deleteSecondCharacterAction = (
  dispatch: React.Dispatch<ActionType>
) => {
  dispatch({ type: CharacterActions.DELETE_SECOND_CHARACTER });
};

export const deleteAllCharactersAction = (
  dispatch: React.Dispatch<ActionType>
) => {
  dispatch({ type: CharacterActions.DELETE_ALL_CHARACTERS });
};

export const setAllEpisodesAction = (
  dispatch: React.Dispatch<ActionType>,
  episodes: Character[]
) => {
  dispatch({ type: CharacterActions.SET_ALL_EPISODES, payload: episodes });
};
