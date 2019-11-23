import React from "react";
import styles from "./App.module.css";

import Message from "../Message";
import Board from "../Board";
import Controls from "../Controls";

import { useBattleship } from "../hooks/useBattleship";

function App() {
  const { state, setGuess, fire } = useBattleship();

  return (
    <div className={styles.board}>
      <Message>{state.message}</Message>
      <Board hits={state.hits} misses={state.misses} />
      <Controls
        guess={state.guess}
        handleInput={setGuess}
        handleSubmit={fire}
      />
    </div>
  );
}

export default App;
