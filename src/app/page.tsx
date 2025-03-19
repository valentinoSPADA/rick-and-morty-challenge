"use client";
import CharacterProvider from "./context/MainContext";
import dynamic from "next/dynamic";

const Main = dynamic(() => import("./components/main/Main"), {
  loading: () => <div>Loading...</div>,
  ssr: false,
});
export default function Home() {
  return (
    <CharacterProvider>
      <Main />
    </CharacterProvider>
  );
}
