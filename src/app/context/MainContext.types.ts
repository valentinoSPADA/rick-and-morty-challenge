import { Character } from "@/app/types/Character.types";
import { Episode } from "@/app/types/Episode.types";

export type CharacterStateType = {
  firstCharacter: Character | null;
  secondCharacter: Character | null;
  episodes: Episode[] | null;
};

export enum CharacterActions {
  SET_FIRST_CHARACTER = "SET_FIRST_CHARACTER",
  SET_SECOND_CHARACTER = "SET_SECOND_CHARACTER",
  DELETE_FIRST_CHARACTER = "DELETE_FIRST_CHARACTER",
  DELETE_SECOND_CHARACTER = "DELETE_SECOND_CHARACTER",
  DELETE_ALL_CHARACTERS = "DELETE_ALL_CHARACTERS",
  SET_ALL_EPISODES = "SET_ALL_EPISODES",
}

export type CharacterContextActions = {
  [key: string]: (payload?: any) => void;
};

export type ActionType = {
  type: CharacterActions;
  payload?: any;
};

export type CharacterContextType = {
  state: CharacterStateType;
  actions: CharacterContextActions;
};
