import React, { useEffect } from "react";
import GameBoard from "./components/GameBoard";
import GameInfos from "./components/GameInfos";
import { GameMechanics } from "./components/GameMechanics";
import "./styles.css";

export default function App() {
  useEffect(() => {
    GameMechanics();
    console.log("GameMechanics loaded");
  });
  return (
    <>
      <GameInfos />
      <GameBoard />
      <GameMechanics />
    </>
  );
}
