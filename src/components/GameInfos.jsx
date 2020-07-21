import React from "react";

const GameInfos = ({ gameScreen, toRestart, setScreen }) => {
  return (
    <>
      <h3>
        The current Player is: Player <span id="current-player">1</span>
      </h3>
      <button onClick={() => toRestart(gameScreen)}>restart</button>
      <button onClick={() => setScreen()}>back to menu</button>
      <p id="result" />
    </>
  );
};

export default GameInfos;
