import React from "react";
import PropTypes from "prop-types";
import styles from "./Message.module.css";

function Message({ children }) {
  return <div className={styles.messageArea}>{children}</div>;
}

Message.propTypes = {
  children: PropTypes.node
};

export default Message;
