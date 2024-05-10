import "./styles.css";
import { useState, useEffect } from "react";

const calculateWin = (boxes) => {
  const winningTemplate = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [1, 4, 7],
    [2, 4, 6]
  ];
  for (let i = 0; i < winningTemplate.length; i++) {
    const [f, s, t] = winningTemplate[i];
    if (boxes[f] && boxes[f] === boxes[s] && boxes[f] === boxes[t]) {
      return boxes[f];
    }
  }
  return null;
};

export default function App() {
  const [boxes, setBoxValues] = useState(Array(9).fill(null));

  // const [boxes, setBoxValues] = useState([
  //   "X",
  //   "O",
  //   "X",
  //   "O",
  //   "",
  //   "O",
  //   "O",
  //   "X",
  //   "O"
  // ]);

  const [isCurrentPlayer, seIsCurrentPlayer] = useState(true);

  const [winner, setWinner] = useState("");

  // const [message, setMessage] = useState("");

  useEffect(() => {
    if (currentWinner) {
      setWinner(currentWinner);
    }
  }, [isCurrentPlayer]);

  const ifAllBoxesFilled = () => {
    return boxes.every((item) => item === "X" || item === "O");
  };

  const handleClick = (index) => {
    const tempBoxes = boxes;
    if (boxes[index] || winner) {
      return;
    }
    tempBoxes[index] = isCurrentPlayer ? "X" : "O";

    seIsCurrentPlayer((prevValue) => !prevValue);
    setBoxValues(tempBoxes);
  };

  console.log("boxes", boxes);

  const Box = ({ value, onClick }) => {
    return (
      <div className="box" onClick={onClick}>
        {value}
      </div>
    );
  };

  const doReset = () => {
    setBoxValues(Array(9).fill(null));
    setWinner("");
  };

  const currentWinner = calculateWin(boxes);

  console.log("winner", winner);

  console.log("ifAllBoxesFilled()", ifAllBoxesFilled());

  return (
    <div className="App">
      <h1>Game khelo bhau ! Kitna kaam karoge </h1>
      <div className="container">
        <div className="row1">
          {[0, 1, 2].map((item) => {
            return (
              <Box value={boxes[item]} onClick={() => handleClick(item)} />
            );
          })}
        </div>
        <div className="row1">
          {[3, 4, 5].map((item) => {
            return (
              <Box value={boxes[item]} onClick={() => handleClick(item)} />
            );
          })}
        </div>
        <div className="row1">
          {[6, 7, 8].map((item) => {
            return (
              <Box value={boxes[item]} onClick={() => handleClick(item)} />
            );
          })}
        </div>
      </div>
      {winner && <h1>{`${winner} jeet lia !!`}</h1>}
      {ifAllBoxesFilled() && !winner && (
        <h4>{"Koi Nahi jeeta :(   GAME RESET KARO bc !!"}</h4>
      )}
      <button onClick={doReset}> Reset </button>
    </div>
  );
}
