import React, {
  createContext,
  useContext,
  useReducer,
  useCallback,
  useMemo,
  ReactNode,
} from "react";
import { CharacterContextType } from "./MainContext.types";
import { reducer } from "./Reducer/MainReducer";
import {
  setFirstCharacterAction,
  setSecondCharacterAction,
  deleteAllCharactersAction,
  deleteFirstCharacterAction,
  deleteSecondCharacterAction,
  setAllEpisodesAction,
} from "./Reducer/MainActions";
import { initialState } from "./MainContextUtils";
import { Character } from "@/app/types/Character.types";
const CharacterContext = createContext<CharacterContextType>({
  state: initialState,
  actions: {},
});

const CharacterProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const setFirstCharacter = useCallback(
    (firstCharacter: Character) =>
      setFirstCharacterAction(dispatch, firstCharacter),
    [dispatch]
  );
  const setSecondCharacter = useCallback(
    (secondCharacter: Character) =>
      setSecondCharacterAction(dispatch, secondCharacter),
    [dispatch]
  );
  const deleteFirstCharacter = useCallback(
    () => deleteFirstCharacterAction(dispatch),
    [dispatch]
  );
  const deleteSecondCharacter = useCallback(
    () => deleteSecondCharacterAction(dispatch),
    [dispatch]
  );
  const deleteAllCharacters = useCallback(
    () => deleteAllCharactersAction(dispatch),
    [dispatch]
  );
  const setAllEpisodes = useCallback(
    (episodes: Character[]) => setAllEpisodesAction(dispatch, episodes),
    [dispatch]
  );

  const fullCtx: CharacterContextType = useMemo(
    () => ({
      state: { ...state },
      actions: {
        setFirstCharacter,
        setSecondCharacter,
        deleteFirstCharacter,
        deleteSecondCharacter,
        deleteAllCharacters,
        setAllEpisodes,
      },
    }),
    [
      setFirstCharacter,
      setSecondCharacter,
      deleteAllCharacters,
      deleteFirstCharacter,
      deleteSecondCharacter,
      setAllEpisodes,
      state,
    ]
  );

  return (
    <CharacterContext.Provider value={fullCtx}>
      {children}
    </CharacterContext.Provider>
  );
};

const useMainContext = () => useContext(CharacterContext);

export { CharacterContext, useMainContext };
export default CharacterProvider;
