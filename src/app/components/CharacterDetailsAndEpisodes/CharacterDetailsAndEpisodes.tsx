import React from "react";
import { useMainContext } from "@/app/context/MainContext";
import EpisodesComparison from "../Episodes/Episodes";
import CharacterDetail from "../CharacterDetail/CharacterDetail";

const CharacterDetailsAndEpisodes: React.FC = () => {
  const { state } = useMainContext();
  const { firstCharacter, secondCharacter } = state;

  return (
    <div
      id="character-details-and-episodes"
      className="w-screen max-w-[1300px] grid gap-4 grid-column-1335 md:grid-rows-1 md:grid-flow-dense justify-center"
      data-testid="character-details"
    >
      <div className="flex w-full justify-center">
        {firstCharacter && (
          <CharacterDetail character={firstCharacter} characterNumber={1} />
        )}
      </div>
      <div
        className="flex w-full justify-center contenedor-1"
        data-testid="episodes-comparison"
      >
        <EpisodesComparison />
      </div>
      <div className="flex w-full justify-center contenedor-3">
        {secondCharacter && (
          <CharacterDetail character={secondCharacter} characterNumber={2} />
        )}
      </div>
    </div>
  );
};

export default CharacterDetailsAndEpisodes;
