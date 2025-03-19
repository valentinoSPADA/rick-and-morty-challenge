import { useMainContext } from "@/app/context/MainContext";
import { getEpisodesBySeason } from "@/app/utils/episodesUtils";
import React from "react";

interface CharacterEpisodesPopUpProps {
  characterEpisodes: string[];
  onClose: () => void;
  characterName: string;
}

const CharacterEpisodesPopUp: React.FC<CharacterEpisodesPopUpProps> = ({
  characterEpisodes,
  onClose,
  characterName,
}) => {
  const { state } = useMainContext();
  const { episodes } = state;

  const groupedEpisodes = getEpisodesBySeason(characterEpisodes!, episodes!);
  return (
    <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded max-w-[600px] max-h-[80vh] overflow-y-auto ">
        <div className="flex flex-col gap-5 pl-8 pr-8 rounded-2xl max-w-[600px] max-h-min">
          <div className="sticky top-0 bg-white w-full h-full mt-8 pt-2 pb-2">
            <h2 className="text-3xl font-semibold ">
              Episodes with {characterName}
            </h2>
          </div>
          {Object.keys(groupedEpisodes).length > 0 ? (
            Object.keys(groupedEpisodes).map((season) => (
              <div key={season}>
                <h3 className="text-2xl font-medium">Season number {season}</h3>
                <ul>
                  {groupedEpisodes[season].map((episode) => (
                    <li key={episode.url} className="text-md">
                      <span className="mr-2">
                        {Number(episode.episode.slice(4, 6))}
                      </span>
                      <span className="font-bold mr-1">{episode.name}</span>{" "}
                      {episode.air_date}
                    </li>
                  ))}
                </ul>
              </div>
            ))
          ) : (
            <p>No shared episodes found.</p>
          )}
          <div className="sticky w-full bottom-0 bg-white p-4 flex justify-end">
            <button
              className="sticky bg-status text-white p-2 rounded-md w-24 bottom-0 cursor-pointer"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterEpisodesPopUp;
