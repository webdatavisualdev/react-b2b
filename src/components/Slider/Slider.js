import React from "react";
import { Slider } from "antd";
import cx from "classnames";
import styles from "./Slider.module.scss";

const CustomSlider = ({ options, className,...other }) => (
  <Slider
    tooltipVisible
    className={cx(styles.root, className)}
    {...other}
  />
);

export default CustomSlider;