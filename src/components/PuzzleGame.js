import React, { useState, useEffect } from 'react';
import "./PuzzleGame.css";
import Tile from './Tile';

const shuffle = (array: string[]) => { 
  for (let i = array.length - 1; i > 0; i--) { 
    const j = Math.floor(Math.random() * (i + 1)); 
    [array[i], array[j]] = [array[j], array[i]]; 
  } 
  return array; 
};

function PuzzleGame(props) {
  const [finalPosition, setFinalPosition] = useState([
      {row: 1, col: 1}, {row: 1, col: 2}, { row: 1, col: 3},
      {row: 2, col: 1}, {row: 2, col: 2}, { row: 2, col: 3},
      {row: 3, col: 1}, {row: 3, col: 2}, { row: 3, col: 3},
    ]);
  const [shuffledPosition, setShuffledPosition] = useState(shuffle(JSON.parse(JSON.stringify(finalPosition))));
  const [isWon, setIsWon] = useState(false);

  useEffect(() => {
    let result = true;

    for (var i = 0; i < 9; i++) {
      if (shuffledPosition[i].row !== finalPosition[i].row || shuffledPosition[i].col !== finalPosition[i].col) {
        result = false;
      }
    }

    setIsWon(result);
  }, [shuffledPosition, finalPosition]);

  const handleTileClick = (idx) => {
    if (!isWon && idx < 8) {
      if (canSwap(idx)) {
        let tempArr = JSON.parse(JSON.stringify(shuffledPosition))
        let temp = tempArr[idx];
        tempArr[idx] = tempArr[8];
        tempArr[8] = temp;
        setShuffledPosition(tempArr);
      }
    }
  };

  const canSwap = function(idx) {
    let chosenTile = shuffledPosition[idx];
    let blankTile = shuffledPosition[8];
    let rowDifference = chosenTile.row - blankTile.row;
    let colDifference = chosenTile.col - blankTile.col;

    if (chosenTile.row === blankTile.row && (colDifference === 1 || colDifference === -1)) return true;

    if (chosenTile.col === blankTile.col && (rowDifference === 1 || rowDifference === -1)) return true;

    return false;
  };

  return (
    <div className="puzzle-game">
      {finalPosition.map((item, idx) => {
        return(
          <Tile
            key={idx}
            row={shuffledPosition[idx].row}
            col={shuffledPosition[idx].col}
            idx={idx}
            isWon={isWon}
            onClick={handleTileClick}
            />
        );
      })}
    </div>
  );
}

export default PuzzleGame;
