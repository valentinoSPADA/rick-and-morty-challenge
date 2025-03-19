import React, { useEffect, useState } from "react";
import { Character } from "@/app/types/Character.types";
import Image from "next/image";
import CharacterEpisodesPopUp from "../CharacterEpisodesPopUp/CharacterEpisodesPopUp";

const CharacterDetail: React.FC<{
  character: Character;
  characterNumber: number;
}> = ({ character, characterNumber }) => {
  const [showEpisodes, setShowEpisodes] = useState(false);

  useEffect(() => {
    if (showEpisodes) {
      document.body.style.overflowY = "hidden";
    } else document.body.style.overflowY = "scroll";
    return () => {};
  }, [showEpisodes]);

  return (
    <>
      {showEpisodes && (
        <CharacterEpisodesPopUp
          characterName={character.name}
          characterEpisodes={character.episode}
          onClose={() => setShowEpisodes(false)}
        />
      )}
      <div className="bg-white shadow-lg p-8 rounded-2xl flex flex-col items-center w-[340px] gap-5 sticky top-20 max-h-min sticky-out md:col-span-1">
        <h1 className="text-2xl font-bold text-center">
          Character {characterNumber}
        </h1>
        <Image
          src={character.image}
          alt={character.name}
          className="rounded-2xl"
          width={270}
          height={270}
        />
        <h2 className="text-3xl text-center font-bold">
          {character ? character.name : null}
        </h2>
        <div className="flex flex-col gap-2 w-full">
          <p>
            <strong>Status:</strong> {character.status}
          </p>
          <p>
            <strong>Species:</strong> {character.species}
          </p>
          <p>
            <strong>Type:</strong> {character.type}
          </p>
          <p>
            <strong>Gender:</strong> {character.gender}
          </p>
          <p>
            <strong>Origin:</strong> {character.origin.name}
          </p>
          <p>
            <strong>Location:</strong> {character.location.name}
          </p>
          <p>
            <strong>Created:</strong>{" "}
            {new Date(character.created).toLocaleDateString()}
          </p>
          <div className="flex justify-center align-bottom mt-8">
            <button
              onClick={() => setShowEpisodes(true)}
              className="bg-status text-white p-2 rounded-md w-40 cursor-pointer"
            >
              Show Episodes
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CharacterDetail;
