"use client";
import { useState } from "react";
import dynamic from "next/dynamic";

const CardList = dynamic(() => import("../CardList/CardList"), {
  loading: () => <div>Loading CardList...</div>,
  ssr: false,
});
const CharacterButtons = dynamic(() => import("../Buttons/Buttons"), {
  loading: () => <div>Loading Buttons...</div>,
  ssr: false,
});
const Paginator = dynamic(() => import("../Paginator/Paginator"), {
  loading: () => <div>Loading Paginator...</div>,
  ssr: false,
});
const CharacterDetailsAndEpisodes = dynamic(
  () => import("../CharacterDetailsAndEpisodes/CharacterDetailsAndEpisodes"),
  {
    loading: () => <div>Loading CharacterDetailsAndEpisodes...</div>,
    ssr: false,
  }
);
export default function Main() {
  const [paginator, setPaginator] = useState({
    totalItems: 0,
    itemsPerPage: 0,
    actualPage: 1,
  });

  return (
    <div>
      <main className="flex flex-col justify-center items-center p-5 gap-10 font-[family-name:var(--font-geist-sans)]">
        <div className="absolute inset-0 flex justify-center top-[-350px] -z-10">
          <div className="w-[520px] h-[520px] rounded-full blur-[195px] bg-red opacity-50 -z-10 ml-42"></div>
          <div className="w-[520px] h-[520px] rounded-full bg-specie blur-3xl opacity-50 -z-10 mr-42"></div>
        </div>
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-4xl font-bold text-center sm:text-left ">
            Rick and Morty Challenge
          </h1>
          <p className="text-lg text-center sm:text-left --text">
            Select two characters from Rick and Morty and explore their shared
            episodes
          </p>
          <CharacterButtons />
        </div>
        <CardList
          actualPage={paginator.actualPage}
          setPaginator={setPaginator}
        />
        <Paginator
          totalItems={paginator.totalItems}
          itemsPerPage={20}
          onSelectedPage={(page) =>
            setPaginator({ ...paginator, actualPage: page })
          }
        />
        <CharacterDetailsAndEpisodes />
      </main>
    </div>
  );
}
