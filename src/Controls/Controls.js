import React from "react";
import PropTypes from "prop-types";
import styles from "./Controls.module.css";

function Controls({ guess, handleInput, handleSubmit }) {
  return (
    <form className={styles.form}>
      <input
        className={styles.formInput}
        type="text"
        placeholder="A0"
        onChange={handleInput}
        value={guess}
      />
      <button className={styles.formInput} onClick={handleSubmit}>
        Fire
      </button>
    </form>
  );
}

Controls.propTypes = {
  guess: PropTypes.string,
  handleInput: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

export default Controls;
