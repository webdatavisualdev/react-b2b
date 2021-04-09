import React from "react";
import styles from "./IconButton.module.scss";

const IconButton = ({ Icon, onClick }) => (
  <button className={styles.iconButton} onClick={onClick}><Icon /></button>
);

export default IconButton;
