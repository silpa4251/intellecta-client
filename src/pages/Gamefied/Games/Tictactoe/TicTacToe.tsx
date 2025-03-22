import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";

const initialBoard = Array(9).fill(null);
const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const TicTacToe = () => {
  const [board, setBoard] = useState(initialBoard);
  const [fullScreen, setFullScreen] = useState(false)
  const [isXTurn, setIsXTurn] = useState(true);
  const [winner, setWinner] = useState(null);

  const checkWinner = (newBoard) => {
    for (let combo of winningCombos) {
      const [a, b, c] = combo;
      if (
        newBoard[a] &&
        newBoard[a] === newBoard[b] &&
        newBoard[a] === newBoard[c]
      ) {
        return newBoard[a];
      }
    }
    return newBoard.includes(null) ? null : "Draw";
  };

  const handleClick = (index) => {
    if (board[index] || winner) return;
    const newBoard = [...board];
    newBoard[index] = isXTurn ? "X" : "O";
    setBoard(newBoard);
    const result = checkWinner(newBoard);
    setWinner(result);
    setIsXTurn(!isXTurn);
  };

  const resetGame = () => {
    setBoard(initialBoard);
    setIsXTurn(true);
    setWinner(null);
  };

  return (
    <div className="absolute left-0 top-0 w-screen min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-4">
      <Link to="/games/allgames">
      <button className="cursor-pointer absolute top-5 left-5 text-2xl font-semibold"><IoMdClose/></button>
      </Link>
      <motion.h1
        className="text-4xl font-bold mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Tic Tac Toe
      </motion.h1>
      <div className="grid grid-cols-3 gap-4">
        {board.map((cell, index) => (
          <motion.div
            key={index}
            onClick={() => handleClick(index)}
            className="w-24 h-24 bg-gray-700 hover:bg-gray-600 border-2 border-gray-500 flex items-center justify-center text-3xl font-bold rounded-2xl shadow-xl cursor-pointer transition duration-200"
            whileTap={{ scale: 0.9 }}
          >
            {cell}
          </motion.div>
        ))}
      </div>
      {winner && (
        <motion.div
          className="mt-6 text-2xl font-semibold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {winner === "Draw" ? "It's a Draw!" : `${winner} Wins!`}
        </motion.div>
      )}
      <button
        onClick={resetGame}
        className="mt-4 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-xl shadow-lg"
      >
        Reset Game
      </button>
    </div>
  );
};

export default TicTacToe;
