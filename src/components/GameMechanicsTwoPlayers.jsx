import React from "react";
import { winningArrays } from "../utils/Utils";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const GameMechanicsTwoPlayers = restart => {
  const squares = document.querySelectorAll(".grid div");
  const result = document.querySelector("#result");
  const displayCurrentPlayer = document.querySelector("#current-player");
  let currentPlayer = 1;

  if (restart) {
    squares.forEach((square, index) => {
      if (index < 42) {
        square.classList.remove("taken");
        square.classList.remove("player-one");
        square.classList.remove("player-two");
        square.classList.remove("winner");
      }
    });
  }

  for (var i = 0, len = squares.length; i < len; i++)
    (function(index) {
      //add an onclick to each square in your grid
      squares[i].onclick = function() {
        //if the square below your current square is taken, you can go ontop of it
        if (
          squares[index + 7].classList.contains("taken") &&
          !squares[index].classList.contains("taken")
        ) {
          if (currentPlayer === 1) {
            squares[index].classList.add("taken");
            squares[index].classList.add("player-one");
            //change the player
            currentPlayer = 2;
            displayCurrentPlayer.innerHTML = currentPlayer;
          } else if (currentPlayer === 2) {
            squares[index].classList.add("taken");
            squares[index].classList.add("player-two");
            //change the player
            currentPlayer = 1;
            displayCurrentPlayer.innerHTML = currentPlayer;
          }
          //if the sqaure below your current swqaure is not taken, you can't go there
        } else {
          if (currentPlayer === 1) {
            toast.error("cant go there", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined
            });
          } else {
            toast.warn("cant go there", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined
            });
          }
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
        result.innerHTML = "Player one wins!";

        square1.classList.add("winner");
        square2.classList.add("winner");
        square3.classList.add("winner");
        square4.classList.add("winner");
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
        result.innerHTML = "Player two wins!";

        square1.classList.add("winner");
        square2.classList.add("winner");
        square3.classList.add("winner");
        square4.classList.add("winner");
      }
    }
  }

  //add an event listener to each square that will trigger the checkBoard function on click
  squares.forEach(square => square.addEventListener("click", checkBoard));

  return <ToastContainer />;
};
