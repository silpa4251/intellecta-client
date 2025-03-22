import { useState } from "react";
import { FaSadTear } from "react-icons/fa";
import { FaTrophy } from "react-icons/fa6";

const choices = [
  { name: "Rock", emoji: "✊" },
  { name: "Paper", emoji: "✋" },
  { name: "Scissors", emoji: "✌️" },
];

const getResult = (user, computer) => {
  if (user === computer) return "It's a Draw!";
  if (
    (user === "Rock" && computer === "Scissors") ||
    (user === "Paper" && computer === "Rock") ||
    (user === "Scissors" && computer === "Paper")
  ) {
    return "You Win!";
  }
  return "You Lose!";
};

const WinComponent = ({ message }) => (
  <div className="bg-green-800 text-white p-6 rounded-xl shadow-2xl text-center animate-pulse">
    <h2 className="text-3xl font-bold mb-2">{message}</h2>
    <p className="text-xl">Thanks for playing!</p>
  </div>
);

export default function RockPaperScissors() {
  const [userChoice, setUserChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState("");
  const [userScore, setUserScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [winnerMessage, setWinnerMessage] = useState("");
  const [isUserWinner, setIsUserWinner] = useState(false);

  const handleClick = (choice) => {
    if (gameOver) return;

    const randomChoice =
      choices[Math.floor(Math.random() * choices.length)].name;
    const outcome = getResult(choice, randomChoice);

    setUserChoice(choice);
    setComputerChoice(randomChoice);
    setResult(outcome);

    if (outcome === "You Win!") {
      setUserScore((prev) => {
        const newScore = prev + 1;
        if (newScore >= 3) {
          setWinnerMessage("You won the game! 🎉");
          setGameOver(true);
          setIsUserWinner(true);
        }
        return newScore;
      });
    } else if (outcome === "You Lose!") {
      setComputerScore((prev) => {
        const newScore = prev + 1;
        if (newScore >= 3) {
          setWinnerMessage("Computer won the game! 😞");
          setGameOver(true);
          setIsUserWinner(false);
        }
        return newScore;
      });
    }
  };

  const resetGame = () => {
    setUserChoice(null);
    setComputerChoice(null);
    setResult("");
    setUserScore(0);
    setComputerScore(0);
    setGameOver(false);
    setWinnerMessage("");
    setIsUserWinner(false);
  };

  const getChoiceEmoji = (choiceName) => {
    const choice = choices.find((c) => c.name === choiceName);
    return choice ? choice.emoji : "";
  };

  return (
    <div className="absolute left-0 top-0 w-screen min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-4">
      <h1 className="text-5xl font-bold mb-8 text-purple-400 drop-shadow-lg animate-pulse">
        Rock Paper Scissors
      </h1>

      <div className="flex gap-6 mb-10">
        {choices.map((choice) => (
          <button
            key={choice.name}
            onClick={() => handleClick(choice.name)}
            className="bg-gray-800 hover:bg-gray-700 px-8 py-6 rounded-full shadow-lg text-2xl font-semibold transition transform hover:scale-110 border border-purple-500"
          >
            <span className="text-4xl mr-2">{choice.emoji}</span> {choice.name}
          </button>
        ))}
      </div>

      {result && !gameOver && (
        <div className="text-center mb-8">
          <p className="text-3xl font-bold text-yellow-300 mb-4 animate-bounce">
            {result}
          </p>
          <div className="flex items-center justify-center gap-10">
            <div className="flex flex-col items-center">
              <p className="text-xl mb-2">You</p>
              <div className="text-5xl bg-gray-700 p-4 rounded-full shadow-inner">
                {getChoiceEmoji(userChoice)}
              </div>
              <p className="mt-2 text-lg">{userChoice}</p>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-xl mb-2">Computer</p>
              <div className="text-5xl bg-gray-700 p-4 rounded-full shadow-inner">
                {getChoiceEmoji(computerChoice)}
              </div>
              <p className="mt-2 text-lg">{computerChoice}</p>
            </div>
          </div>
        </div>
      )}

      <div className="bg-gray-800 p-6 rounded-2xl shadow-xl w-72 flex justify-between text-lg font-semibold border border-purple-500 mb-4">
        <span>
          Your Score: <span className="text-green-400">{userScore}</span>
        </span>
        <span>
          CPU: <span className="text-red-400">{computerScore}</span>
        </span>
      </div>

      {gameOver && (
        <>
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-3xl shadow-2xl p-10 text-center max-w-md w-full animate-bounce-in">
              <div className="flex justify-center mb-4">
                {isUserWinner ? (
                  <FaTrophy className="text-6xl text-yellow-500 animate-wiggle" />
                ) : (
                  <FaSadTear className="text-6xl text-blue-500 animate-wiggle" />
                )}
              </div>
              <h2 className="text-4xl font-bold text-purple-700 mb-6">
                {winnerMessage}
              </h2>
              <button
                onClick={resetGame}
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-full text-lg shadow transition-transform transform hover:scale-105"
              >
                Play Again
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
