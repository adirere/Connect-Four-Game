import React from "react";
import { winningArrays, gameboard } from "../utils/Utils";
import { ToastContainer, toast } from "react-toastify";
import { GameAi } from "./GameAi";
import "react-toastify/dist/ReactToastify.css";

export const GameMechanicsOnePlayer = () => {
  const grid = document.querySelector(".grid");
  const squares = document.querySelectorAll(".grid div");
  const result = document.querySelector("#result");
  const displayCurrentPlayer = document.querySelector("#current-player");
  let winner = false;
  let currentPlayer = 1,
    computedPosition;

  for (var i = 0, len = squares.length; i < len; i++)
    (function(index) {
      //add an onclick to each square in your grid
      squares[i].onclick = function() {
        //if the square below your current square is taken, you can go ontop of it
        if (
          squares[index + 7].classList.contains("taken") &&
          !squares[index].classList.contains("taken") &&
          !winner
        ) {
          grid.style.pointerEvents = "none";
          squares[index].classList.add("taken");
          squares[index].classList.add("player-one");
          gameboard[index] = currentPlayer;
          checkBoard();
          if (!winner) {
            //change the player
            currentPlayer = 2;
            displayCurrentPlayer.innerHTML = currentPlayer;
            setTimeout(
              () => {
                computedPosition = GameAi(gameboard);
                squares[computedPosition].classList.add("taken");
                squares[computedPosition].classList.add("player-two");
                gameboard[computedPosition] = currentPlayer;
                checkBoard();
                //change the player
                if (!winner) {
                  currentPlayer = 1;
                  displayCurrentPlayer.innerHTML = currentPlayer;
                  grid.style.pointerEvents = "all";
                }
              },

              1000
            );
          }

          //if the sqaure below your current swqaure is not taken, you can't go there
        } else {
          toast.error("cant go there", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined
          });
        }
      };
    })(i);

  //check the board for a win or lose
  function checkBoard() {
    //now take the 4 values in earch winningArray & plug them into the squares values
    for (let y = 0; y < winningArrays.length; y++) {
      const square1 = squares[winningArrays[y][0]];
      const square2 = squares[winningArrays[y][1]];
      const square3 = squares[winningArrays[y][2]];
      const square4 = squares[winningArrays[y][3]];

      //now check those arrays to see if they all have the class of player-one
      if (
        square1.classList.contains("player-one") &&
        square2.classList.contains("player-one") &&
        square3.classList.contains("player-one") &&
        square4.classList.contains("player-one")
      ) {
        //if they do, player-one is passed as the winner
        grid.style.pointerEvents = "none";
        winner = true;
        result.innerHTML = "Player one wins!";
        //remove ability to change result
      }
      //now check to see if they all have the classname player two
      else if (
        square1.classList.contains("player-two") &&
        square2.classList.contains("player-two") &&
        square3.classList.contains("player-two") &&
        square4.classList.contains("player-two")
      ) {
        //if they do, player-two is passed as the winner as well as the chip positions
        grid.style.pointerEvents = "none";
        winner = true;
        setTimeout(() => {
          result.innerHTML = "Player two wins!";
        }, 1000);
      }
    }
  }

  //add an event listener to each square that will trigger the checkBoard function on click

  return <ToastContainer />;
};
