import React from "react";
import { Checkbox as DefaultCheckbox } from "antd";
import cx from "classnames";
import styles from "./CheckboxGroup.module.scss";

const CheckboxGroup = ({ className, invert, size, ...other }) => {
  return (
    <DefaultCheckbox.Group
      className={cx(styles.root, className, {
        [styles.invert]: invert,
        [styles[size]]: true,
      })}
      {...other}
    />
  );
};

export const Checkbox = ({ className, invert, reverse, size, ...other }) => {
  return (
    <DefaultCheckbox
      className={cx(styles.root, className, {
        [styles.invert]: invert,
        [styles.reverse]: reverse,
        [styles[size]]: true,
      })}
      {...other}
    />
  );
};

export default CheckboxGroup;