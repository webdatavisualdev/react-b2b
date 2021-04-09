import React from "react";
import { Pagination } from "antd";
import cx from "classnames";
import styles from "./Pagination.module.scss";

const CustomPagination = ({ className,...other }) => {
  const itemRenderer = (page, type, originalElement) => {
    return originalElement;
  };

  return (
    <div className={cx(styles.root, className)}>
      <Pagination
        itemRender={itemRenderer}
        {...other}
      />
    </div>
  );
};

export default CustomPagination;
