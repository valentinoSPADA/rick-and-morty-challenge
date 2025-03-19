import { Character, CharacterResponse } from "@/app/types/Character.types";
import React, { useState, useEffect } from "react";
import Card from "../Card/Card";
import ErrorPopUp from "../ErrorPopUp/ErrorPopUp";
import { useMainContext } from "@/app/context/MainContext";
import { getCharacters } from "@/app/utils/fetchUtils";

export interface CardListProps {
  actualPage: number;
  setPaginator: ({
    totalItems,
    itemsPerPage,
    actualPage,
  }: {
    totalItems: number;
    itemsPerPage: number;
    actualPage: number;
  }) => void;
}

const CardList: React.FC<CardListProps> = ({ actualPage, setPaginator }) => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [showErrorPopUp, setShowErrorPopUp] = useState(false);
  const {
    actions: { setFirstCharacter, setSecondCharacter },
    state: { firstCharacter, secondCharacter },
  } = useMainContext();

  const onSelectCharacter = (character: Character) => {
    if (!firstCharacter) {
      setFirstCharacter(character);
    } else if (!secondCharacter) {
      setSecondCharacter(character);
      setTimeout(() => {
        document
          .getElementById("character-details-and-episodes")
          ?.scrollIntoView({ behavior: "smooth" });
      }, 0);
    } else {
      setShowErrorPopUp(true);
    }
    if (!firstCharacter && secondCharacter) {
      setTimeout(() => {
        document
          .getElementById("character-details-and-episodes")
          ?.scrollIntoView({ behavior: "smooth" });
      }, 0);
    }
  };

  const onCloseError = () => {
    setShowErrorPopUp(false);
  };

  useEffect(() => {
    getCharacters(actualPage).then((response: CharacterResponse) => {
      setPaginator({
        totalItems: response.info.count,
        itemsPerPage: response.results.length,
        actualPage,
      });
      setCharacters(response.results);
    });
  }, [actualPage]);

  return (
    <div
      className="grid grid-cols-1 cards-column gap-4"
      data-testid="card-list"
    >
      {characters.map((character: Character) => (
        <div key={character.id}>
          <Card
            character={character}
            onSelect={onSelectCharacter}
            isFirstCharacter={firstCharacter?.id === character.id}
            isSecondCharacter={secondCharacter?.id === character.id}
          />
        </div>
      ))}
      {showErrorPopUp && (
        <ErrorPopUp
          onClose={onCloseError}
          errorMessage="You need to deselect at least 1 character."
        />
      )}
    </div>
  );
};

export default CardList;
