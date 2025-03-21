import QuestionImage from "../../../../assets/game/question-mark.png";

const MemoryCard = ({ card, handleChoice, flipped, disabled }) => {
  const handleClick = () => {
    if (!disabled && !flipped) {
      handleChoice(card);
    }
  };
  

  return (
    <div className="relative active:scale-105 cursor-pointer" onClick={handleClick}>
      <div className={`transition-transform duration-500 ${flipped ? 'rotate-y-180' : ''}`}>
        <img
          src={flipped ? card.src : QuestionImage}
          alt="card"
          className={`w-28 h-28 object-contain rounded-lg shadow`}
        />
      </div>
    </div>
  );
};

export default MemoryCard;
