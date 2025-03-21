import { useState, useEffect } from "react";
import Card from "./MemoryCard";
import apple from "../../../../assets/game/apple.png";
import cherry from "../../../../assets/game/cherry.png";
import mangosteen from "../../../../assets/game/mangosteen.png";
import orange from "../../../../assets/game/orange.png";
import strawberry from "../../../../assets/game/strawberry.png";
import grape from "../../../../assets/game/grape.png";
import { RiResetRightFill } from "react-icons/ri";
import WinScreen from "./WinScreen";

const cardImages = [
  { src: apple, matched: false },
  { src: cherry, matched: false },
  { src: mangosteen, matched: false },
  { src: orange, matched: false },
  { src: strawberry, matched: false },
  { src: grape, matched: false },
];

const MemoryGame = () => {
  const [cards, setCards] = useState([]);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [moves, setMoves] = useState(0);
  const [isGameWon, setIsGameWon] = useState(false);
  const [time, setTime] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    let timer;
    if (gameStarted) {
      timer = setInterval(() => setTime((t) => t + 1), 1000);
    }
    return () => clearInterval(timer);
  }, [gameStarted]);

  const shuffleCards = () => {
    console.log("reset");
    
    const shuffled = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card, index) => ({ ...card, id: index }));
    setCards(shuffled);
    setMoves(0);
    setTime(0)
    setChoiceOne(null);
    setChoiceTwo(null);
    setGameStarted(false);
  };

  // Handle choice
  const handleChoice = (card) => {
    if (!gameStarted) setGameStarted(true);
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  // Compare cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) =>
          prevCards.map((card) =>
            card.src === choiceOne.src ? { ...card, matched: true } : card
          )
        );
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  // Reset turn
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setMoves((prev) => prev + 1);
    setDisabled(false);
  };

  // Start game on load
  useEffect(() => {
    shuffleCards();
    setIsGameWon(false);
  }, []);

  useEffect(() => {
    if (cards.length && cards.every((card) => card.matched)) {
      setIsGameWon(true);
    }
  }, [cards]);

  useEffect(() => {
    if (cards.every((card) => card.matched)) {
      const bestMoves = localStorage.getItem("bestMoves");
      if (!bestMoves || moves < parseInt(bestMoves)) {
        localStorage.setItem("bestMoves", moves.toString());
      }
    }
  }, [cards, moves]);

  return (
    <div className=" min-h-screen bg-gradient-to-br from-purple-300 via-pink-200 to-yellow-100 flex items-center justify-center p-4">
      <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl p-6 max-w-3xl w-full border-4 border-purple-400">
        <p className="absolute right-10 mt-2 text-lg text-blue-600">⏱️ Time: {time}s</p>
        <h1 className="text-3xl font-bold text-purple-700 mb-10 drop-shadow-sm ">
          Memory Match Game
        </h1>

        <div className="grid grid-cols-4 gap-4 justify-items-center">
          {cards.map((card) => (
            <Card
              key={card.id}
              card={card}
              handleChoice={handleChoice}
              flipped={card === choiceOne || card === choiceTwo || card.matched}
              disabled={disabled}
            />
          ))}
        </div>
        <div className="flex justify-between items-center">
          <p className="mt-6 text-right text-lg font-medium text-purple-600">
            🧮 Moves: <span className="font-bold">{moves}</span>
          </p>
          <button
            onClick={shuffleCards}
            className="cursor-pointer bg-blue-800 p-2 mt-5 rounded-full text-white text-xl]"
          >
            <RiResetRightFill />
          </button>
        </div>
      </div>
      {isGameWon && (
        <WinScreen
          moves={moves}
          onRestart={() => {
            shuffleCards();
            setIsGameWon(false);
          }}
        />
      )}
    </div>
  );
};

export default MemoryGame;
