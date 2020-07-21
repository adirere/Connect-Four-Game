import React, { useState, useEffect } from "react";
import GameBoard from "./components/GameBoard";
import GameInfos from "./components/GameInfos";
import InitialScreen from "./components/InitialScreen";
import { GameMechanicsOnePlayer } from "./components/GameMechanicsOnePlayer";
import { GameMechanicsTwoPlayers } from "./components/GameMechanicsTwoPlayers";
import "./styles.css";

export default function App() {
  const [gameScreen, setGameScreen] = useState(0);
  const [restart, setRestart] = useState(false);

  useEffect(() => {
    if (gameScreen === 1) GameMechanicsOnePlayer();

    if (gameScreen === 2) GameMechanicsTwoPlayers();

    if (restart) setRestart(false);

    console.log("GameMechanics loaded");
  }, [gameScreen, restart]);

  return (
    <>
      {gameScreen === 0 ? (
        <InitialScreen setScreen={choice => setGameScreen(choice)} />
      ) : gameScreen === 1 ? (
        <>
          <GameInfos
            gameScreen={gameScreen}
            toRestart={choice => setRestart(true)}
            setScreen={() => setGameScreen(0)}
          />
          <GameBoard />
          <GameMechanicsOnePlayer restart={restart} />
        </>
      ) : (
        <>
          <GameInfos
            gameScreen={gameScreen}
            toRestart={choice => setRestart(true)}
            setScreen={() => setGameScreen(0)}
          />
          <GameBoard />
          <GameMechanicsTwoPlayers restart={restart} />
        </>
      )}
    </>
  );
}
