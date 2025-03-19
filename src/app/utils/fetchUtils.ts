export const getCharacters = async (page: number) => {
  try {
    const response = await fetch(
      `https://rickandmortyapi.com/api/character/?page=${page}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch characters:", error);
    throw error;
  }
};

export const getEpisodes = async (pageNumber?: string) => {
  try {
    const pageNumberSplit = pageNumber?.split("=");
    const number = pageNumberSplit ? pageNumberSplit[1] : "";
    const response = await fetch(
      `https://rickandmortyapi.com/api/episode${
        number ? `?page=${number}` : ""
      }`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch episodes:", error);
    throw error;
  }
};
