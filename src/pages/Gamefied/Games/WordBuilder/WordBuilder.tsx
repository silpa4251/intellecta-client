import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";

const words = ["apple", "banana", "cherry", "orange", "grape", "mango"];

const shuffleWord = (word: string) => {
  return word
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("");
};

export default function WordBuilder() {
  const [currentWord, setCurrentWord] = useState("");
  const [shuffledWord, setShuffledWord] = useState("");
  const [input, setInput] = useState("");
  const [score, setScore] = useState(100);
  const [message, setMessage] = useState("");
  const [round, setRound] = useState(1);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
   
    newRound();
  }, []);

  const newRound = () => {
    if (round > 10) {
      setGameOver(true);
      return;
    }
    const word = words[Math.floor(Math.random() * words.length)];
    setCurrentWord(word);
    setShuffledWord(shuffleWord(word));
    setInput("");
    setMessage("");
  };

  const checkAnswer = () => {
    if(input === "") return
    if (input.toLowerCase() === currentWord.toLowerCase() && input !== "") {
      toast.success("Correct",{
        position: "bottom-center",
        autoClose:1000
      })
      setScore((prev) => Math.max(0, prev + 10));
    } else {
        toast.error("Incorrect",{
            position: "bottom-center",
            autoClose:1000
          })
      setScore((prev) => Math.max(0, prev - 5));
    }
    setRound((prev) => prev + 1);
    setTimeout(newRound, 1000);
  };

  const resetGame = () => {
    setScore(100);
    setRound(1);
    setGameOver(false);
    newRound();
  };

  return (
    <div className="absolute left-0 top-0 w-screen min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-900 via-blue-800 to-teal-700 text-white p-4 overflow-hidden">
      <Link to="/games/allgames">
        <button className="cursor-pointer absolute top-5 left-5 text-2xl font-semibold">
          <IoMdClose />
        </button>
      </Link>
    <h1
      className="text-5xl font-bold mb-10 text-neon-pink drop-shadow-[0_0_10px_rgba(255,105,180,0.8)] tracking-wider "
    >
       Word Scramble
    </h1>
  
    <div className="flex flex-col items-center w-[90%] py-12 md:w-2/3 justify-center rounded-3xl bg-gradient-to-tr from-indigo-900 to-purple-800 text-white p-8 shadow-[0_0_20px_rgba(0,255,255,0.5)] border-4 border-dashed border-cyan-400 relative overflow-hidden">
      <p className="absolute top-4 right-4 text-xl font-bold text-lime-300 drop-shadow-[0_0_5px_rgba(0,255,0,0.6)]">
        Round {round} / 10
      </p>
  
      {gameOver ? (
        <>
          <p className="text-5xl font-extrabold text-yellow-300 drop-shadow-[0_0_15px_rgba(255,255,0,0.7)] animate-bounce">
            🎉 Game Over!
          </p>
          <p className="text-xl mt-3 text-cyan-200">Final Score: {score}</p>
          <motion.button
            className="mt-8 bg-gradient-to-r from-red-600 to-orange-500 px-10 py-4 rounded-xl shadow-[0_0_10px_rgba(255,0,0,0.8)] hover:from-red-700 hover:to-orange-600 transition-all duration-300 text-2xl font-bold text-white border-2 border-yellow-400"
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            onClick={resetGame}
          >
             Play Again
          </motion.button>
        </>
      ) : (
        <>
          <p
            className="text-6xl font-extrabold mb-8 bg-gradient-to-r from-yellow-400 to-orange-500 text-transparent bg-clip-text px-10 py-5 rounded-xl shadow-[0_0_15px_rgba(255,165,0,0.7)] tracking-widest border-4 border-dashed border-purple-500 text-center"
          >
            {shuffledWord}
          </p>
  
          <motion.input
            className="w-96 text-3xl text-black px-8 py-5 rounded-xl bg-gradient-to-br from-white to-gray-200 outline-none border-4 border-solid border-lime-400 focus:border-lime-600 text-center font-bold tracking-wider shadow-[0_0_10px_rgba(0,255,0,0.5)] placeholder-gray-500"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e)=> e.key === "Enter" && checkAnswer()}
            placeholder="🔠 Guess the Word!"
            whileFocus={{ scale: 1.05, boxShadow: "0 0 15px rgba(0,255,255,0.8)" }}
          />
  
          {/* Message Feedback */}
          <p
            className={`mt-6 text-3xl font-bold ${
              message.includes("✅") ? "text-green-400" : "text-red-500"
            } drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]`}
          >
            {message}
          </p>
  
          <motion.button
            className="absolute bottom-6 right-6 bg-gradient-to-r from-teal-500 to-cyan-500 px-6 py-3 rounded-lg shadow-[0_0_10px_rgba(0,255,255,0.7)] hover:from-teal-600 hover:to-cyan-600 transition-all duration-300 text-lg font-bold border-2 border-white"
            whileTap={{ scale: 0.9 }}
            onClick={checkAnswer}
          >
             Submit
          </motion.button>
        </>
      )}
    </div>
    <p className="mt-4 text-xl text-yellow-200 drop-shadow-[0_0_5px_rgba(255,255,0,0.5)]">
      🌟 Score: {score}
    </p>
  </div>
  );
}
