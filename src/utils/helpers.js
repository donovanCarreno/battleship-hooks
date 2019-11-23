const boardSize = 7;
const shipLength = 3;

function generateShipLocations(ships) {
  const newShips = [];

  ships.forEach(ship => {
    let locations;

    do {
      locations = generateShip();
    } while (collision(locations, newShips));

    newShips.push({ ...ship, locations });
  });

  return newShips;
}

function generateShip() {
  const direction = Math.floor(Math.random() * 2);
  let row;
  let col;

  if (direction === 1) {
    // horizontal
    row = Math.floor(Math.random() * boardSize);
    col = Math.floor(Math.random() * (boardSize - shipLength + 1));
  } else {
    // vertical
    row = Math.floor(Math.random() * (boardSize - shipLength + 1));
    col = Math.floor(Math.random() * boardSize);
  }

  const newShipLocations = [];

  for (let i = 0; i < shipLength; i++) {
    if (direction === 1) {
      newShipLocations.push(`${row}${col + i}`);
    } else {
      newShipLocations.push(`${row + i}${col}`);
    }
  }

  return newShipLocations;
}

function collision(locations, ships) {
  let collision = false;

  ships.forEach(ship => {
    locations.forEach(location => {
      if (ship.locations.indexOf(location) >= 0) {
        collision = true;
      }
    });
  });

  return collision;
}

function parseGuess(guess) {
  const alphabet = ["A", "B", "C", "D", "E", "F", "G"];

  if (guess === null || guess.length !== 2) {
    alert("Oops, please enter a letter and a number on the board.");
  } else {
    const firstChar = guess.charAt(0);
    const row = alphabet.indexOf(firstChar.toUpperCase());
    const column = guess.charAt(1);

    if (isNaN(row) || isNaN(column)) {
      alert("Oops, that isn't on the board.");
    } else if (
      row < 0 ||
      row >= boardSize ||
      column < 0 ||
      column >= boardSize
    ) {
      alert("Oops, that's off the board!");
    } else {
      return row + column;
    }
  }

  return false;
}

export { generateShipLocations, parseGuess };
