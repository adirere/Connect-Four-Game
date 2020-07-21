import React, { useState, useEffect } from "react";
import GameBoard from "./components/GameBoard";
import GameInfos from "./components/GameInfos";
import InitialScreen from "./components/InitialScreen";
import { GameMechanicsOnePlayer } from "./components/GameMechanicsOnePlayer";
import { GameMechanicsTwoPlayers } from "./components/GameMechanicsTwoPlayers";
import "./styles.css";

export default function App() {
  const [gameScreen, setGameScreen] = useState(0);

  useEffect(() => {
    if (gameScreen === 1) GameMechanicsOnePlayer();

    if (gameScreen === 2) GameMechanicsTwoPlayers();

    console.log("GameMechanics loaded");
  }, [gameScreen]);

  return (
    <>
      {gameScreen === 0 ? (
        <InitialScreen setScreen={choice => setGameScreen(choice)} />
      ) : gameScreen === 1 ? (
        <>
          <GameInfos gameScreen={gameScreen} />
          <GameBoard />
          <GameMechanicsOnePlayer />
        </>
      ) : (
        <>
          <GameInfos gameScreen={gameScreen} />
          <GameBoard />
          <GameMechanicsTwoPlayers />
        </>
      )}
    </>
  );
}
