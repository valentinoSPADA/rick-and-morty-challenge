import { Character } from "@/app/types/Character.types";
import Image from "next/image";
import React from "react";

interface CardProps {
  character: Character;
  onSelect: (character: Character) => void;
  isFirstCharacter: boolean;
  isSecondCharacter: boolean;
}

const Card: React.FC<CardProps> = ({
  character,
  onSelect,
  isFirstCharacter,
  isSecondCharacter,
}) => {
  const cardStyle =
    "width-card rounded-2xl overflow-hidden shadow-lg p-4 m-0 max-h-44 h-[220px] relative bg-white ";
  const firstCharacterStyles = "border-4 border-status";
  const secondCharacterStyles = "border-4 border-green";

  return (
    <div
      className={
        cardStyle +
        (isFirstCharacter
          ? firstCharacterStyles
          : isSecondCharacter
          ? secondCharacterStyles
          : "")
      }
    >
      <div className=" flex justify-start items-center ">
        <Image
          className="rounded-full h-min"
          src={character.image}
          alt={character.name}
          width={120}
          height={120}
        />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-1">{character.name}</div>
          <p className="text-status text-base">Status: {character.status}</p>
          <p className="text-specie text-base">Species: {character.species}</p>
          <p className="text-text text-base">Gender: {character.gender}</p>
        </div>
      </div>
      <button
        disabled={isFirstCharacter || isSecondCharacter}
        className="bg-status hover:bg-blue-700 disabled:bg-blue-100 text-white font-bold py-2 px-4 rounded absolute bottom-4 right-4 cursor-pointer  disabled:cursor-not-allowed"
        onClick={() => onSelect(character)}
      >
        Select
      </button>
      {isFirstCharacter && (
        <div className="absolute right-4 top-4 font-extrabold text-4xl text-status">
          1
        </div>
      )}
      {isSecondCharacter && (
        <div className="absolute right-4 top-4 font-extrabold text-4xl text-green">
          2
        </div>
      )}
    </div>
  );
};

export default Card;
