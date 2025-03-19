import { Episode } from "../types/Episode.types";

export const getEpisodesBySeason = (
  stringEpisodes: string[],
  episodes: Episode[]
): Record<string, Episode[]> => {
  return stringEpisodes.reduce((acc, episodeUrl) => {
    const episode = episodes.find((ep) => ep.url === episodeUrl);
    if (episode) {
      const season = episode.episode.slice(2, 3); // Extract "SXX" from "SXXEXX"
      if (!acc[season]) {
        acc[season] = [];
      }
      acc[season].push(episode);
    }
    return acc;
  }, {} as Record<string, Episode[]>);
};
