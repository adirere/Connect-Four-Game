import React, { useEffect } from "react";
import GameBoard from "./components/GameBoard";
import GameInfos from "./components/GameInfos";
import { GameMechanicsOnePlayer } from "./components/GameMechanicsOnePlayer";
import "./styles.css";

export default function App() {
  useEffect(() => {
    GameMechanicsOnePlayer();
    console.log("GameMechanics loaded");
  }, []);
  return (
    <>
      <GameInfos />
      <GameBoard />
      <GameMechanicsOnePlayer />
    </>
  );
}
