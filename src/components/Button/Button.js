import React from "react";
import cx from 'classnames';
import styles from "./Button.module.scss";

const Button = ({
  children,
  size,
  invert,
  variant,
  fullWidth,
  noRound,
  halfWidth,
  ...otherProps
}) => (
  <button
    className={cx(styles.button, {
      [styles[size]]: true,
      [styles[variant]]: true,
      [styles.invert]: invert,
      [styles.fullWidth]: fullWidth,
      [styles.noRound]: noRound,
      [styles.halfWidth]: halfWidth,
    })}
    {...otherProps}
  >
    {children}
  </button>
);

export default Button;
