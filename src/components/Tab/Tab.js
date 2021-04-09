import React from "react";
import { Tabs as DefaultTabs } from "antd";
import cx from "classnames";
import styles from "./Tab.module.scss";

const Tabs = ({ children, className, ...other }) => {
  return (
    <div className={cx(styles.root, className)}>
      <DefaultTabs
        className={styles.tabs}
        {...other}
      >
        {children}
      </DefaultTabs>
    </div>
  );
};

const TabPane = DefaultTabs.TabPane;

export {
  Tabs,
  TabPane
};