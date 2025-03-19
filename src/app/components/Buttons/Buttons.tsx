import React from "react";
import { useMainContext } from "@/app/context/MainContext";

const CharacterButtons: React.FC = () => {
  const {
    actions: {
      deleteFirstCharacter,
      deleteSecondCharacter,
      deleteAllCharacters,
    },
  } = useMainContext();

  return (
    <div className="flex justify-center items-center mt-4">
      <button
        onClick={deleteFirstCharacter}
        className="m-2 rounded-md bg-status text-white p-3 cursor-pointer"
      >
        Deselect first character
      </button>
      <button
        onClick={deleteSecondCharacter}
        className="m-2 rounded-md bg-status text-white p-3 cursor-pointer"
      >
        Deselect second character
      </button>
      <button
        onClick={deleteAllCharacters}
        className="m-2 rounded-md bg-red text-white p-3 cursor-pointer"
      >
        Deselect both characters
      </button>
    </div>
  );
};

export default CharacterButtons;
