import React from 'react';

import "./Tile.css";

function Tile(props) {
  const { row, col, onClick, idx, isWon } = props;
  const tileStyle = {
    left: 16 + (col - 1) * 72,
    top: 16 + (row - 1) * 72
  };

  return (
    <div
      className={`tile ${idx === 8 ? 'blank-tile' : ''} ${isWon ? 'won' : ''}`}
      style={tileStyle}
      onClick={() => { onClick(idx) }}>
      {idx !== 8 ? idx + 1 : null}
    </div>
  );
}

export default Tile;
