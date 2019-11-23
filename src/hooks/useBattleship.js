import React from "react";
import { parseGuess, generateShipLocations } from "../utils/helpers";

const initialState = {
  guess: "",
  hits: [],
  misses: [],
  message: "",
  numGuesses: 0,
  shipsSunk: 0,
  ships: [
    {
      locations: [],
      hits: ["", "", ""]
    },
    {
      locations: [],
      hits: ["", "", ""]
    },
    {
      locations: [],
      hits: ["", "", ""]
    }
  ]
};

function reducer(state, action) {
  switch (action.type) {
    case "set-ships":
      return {
        ...state,
        ships: action.payload
      };
    case "set-guess":
      return {
        ...state,
        guess: action.payload
      };
    case "fire":
      return {
        ...state,
        ...action.payload
      };
    case "reset":
      return {
        ...initialState,
        ships: action.payload
      };
    default:
      return state;
  }
}

function useBattleship() {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const getResults = React.useCallback(
    location => {
      const { ships } = state;
      let hit = false;
      let isSunk = false;

      const updatedShips = ships.map(ship => {
        const index = ship.locations.indexOf(location);

        if (index >= 0) {
          ship.hits[index] = "hit";
          isSunk = ship.hits.every(hit => hit === "hit");
          hit = true;
        }

        return ship;
      });

      return { hit, updatedShips, isSunk };
    },
    [state]
  );

  const fire = React.useCallback(
    e => {
      e.preventDefault();
      let { guess, numGuesses, shipsSunk, ships, hits, misses } = state;

      if (shipsSunk === ships.length) {
        // eslint-disable-next-line no-restricted-globals
        const playAgain = confirm("Game Over. Play Again?");

        if (playAgain) {
          dispatch({ type: "reset", payload: generateShipLocations(ships) });
        }

        return;
      }

      const location = parseGuess(guess);
      let message = "";

      if (location) {
        const { hit, isSunk, updatedShips } = getResults(location);

        if (hit) {
          shipsSunk = isSunk ? shipsSunk + 1 : shipsSunk;
          hits = hits.concat(location);
          message = isSunk ? "You sank my battleship!" : "HIT!";
          message =
            shipsSunk === ships.length
              ? `You sank all my battleships in ${numGuesses + 1} guesses`
              : message;
        } else {
          misses = misses.concat(location);
          message = "You missed";
        }

        dispatch({
          type: "fire",
          payload: {
            message,
            hits,
            misses,
            ships: updatedShips,
            shipsSunk,
            numGuesses: numGuesses + 1,
            guess: ""
          }
        });
      } else {
        dispatch({ type: "set-guess", payload: "" });
      }
    },
    [state, getResults]
  );

  const setGuess = React.useCallback(e => {
    dispatch({ type: "set-guess", payload: e.target.value });
  }, []);

  React.useEffect(() => {
    dispatch({
      type: "set-ships",
      payload: generateShipLocations(state.ships)
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return React.useMemo(() => {
    return {
      state,
      dispatch,
      fire,
      setGuess
    };
  }, [state, fire, setGuess]);
}

export { useBattleship };
