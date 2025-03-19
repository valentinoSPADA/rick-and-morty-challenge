import React, { useEffect } from "react";
import { useMainContext } from "@/app/context/MainContext";
import { getEpisodesBySeason } from "@/app/utils/episodesUtils";
import { Episode, EpisodeResponse } from "@/app/types/Episode.types";
import { getEpisodes } from "@/app/utils/fetchUtils";

const EpisodesComparison = () => {
  const { state, actions } = useMainContext();
  const { firstCharacter, secondCharacter, episodes } = state;
  const { setAllEpisodes } = actions;

  useEffect(() => {
    const allEpisodes: Episode[] = [];
    const getAllEpisodes = async (page?: string) => {
      const episodesResponse: EpisodeResponse = await getEpisodes(page);
      allEpisodes.push(...episodesResponse.results);
      if (episodesResponse.info.next) {
        getAllEpisodes(episodesResponse.info.next);
      } else {
        setAllEpisodes(allEpisodes);
      }
    };
    getAllEpisodes();
  }, []);

  const firstCharacterEpisodes = new Set(firstCharacter?.episode);
  const commonEpisodes =
    firstCharacterEpisodes && secondCharacter
      ? secondCharacter?.episode.filter((episode) =>
          firstCharacterEpisodes.has(episode)
        )
      : [];

  const groupedEpisodes = getEpisodesBySeason(commonEpisodes!, episodes!);

  return (
    <>
      {firstCharacter && secondCharacter && (
        <div className="flex flex-col gap-5 shadow-lg bg-white p-8 contenedor-2 rounded-2xl w-full max-h-min grid-space-1335 max-width-1335">
          <>
            <h2 className="text-3xl font-semibold">shared Episodes</h2>
            {Object.keys(groupedEpisodes).length > 0 ? (
              Object.keys(groupedEpisodes).map((season) => (
                <div key={season}>
                  <h3 className="text-2xl font-medium">
                    Season number {season}
                  </h3>
                  <ul>
                    {groupedEpisodes[season].map((episode) => (
                      <li key={episode.url} className="text-md mt-2">
                        {episode.episode.slice(4, 6)} -{" "}
                        <span className="font-bold">{episode.name}</span> -{" "}
                        {episode.air_date}
                      </li>
                    ))}
                  </ul>
                </div>
              ))
            ) : (
              <p>No shared episodes found.</p>
            )}
          </>
        </div>
      )}
    </>
  );
};

export default EpisodesComparison;
