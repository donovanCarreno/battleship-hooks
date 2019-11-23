import React from "react";
import PropTypes from "prop-types";
import styles from "./Board.module.css";

function Board({ hits, misses }) {
  function renderRows() {
    const rows = [];
    let row = 0;

    while (row < 7) {
      const squares = renderSquares(row);
      rows.push(<tr key={row}>{squares}</tr>);
      row++;
    }

    return rows;
  }

  function renderSquares(row) {
    const squares = [];
    let col = 0;

    while (col < 7) {
      const rowCol = `${row}${col}`;
      let hitMissStyle = "";

      if (hits.indexOf(rowCol) >= 0) {
        hitMissStyle = styles.hit;
      } else if (misses.indexOf(rowCol) >= 0) {
        hitMissStyle = styles.miss;
      }

      squares.push(
        <td
          key={rowCol}
          className={`${styles.tableDetail} ${hitMissStyle}`}
        ></td>
      );
      col++;
    }

    return squares;
  }

  return (
    <table className={styles.table}>
      <tbody>{renderRows()}</tbody>
    </table>
  );
}

Board.propTypes = {
  hits: PropTypes.array.isRequired,
  misses: PropTypes.array.isRequired
};

export default Board;
