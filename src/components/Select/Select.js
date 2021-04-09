import React from "react";
import { Select } from "antd";
import cx from "classnames";
import { ReactComponent as ArrowIcon } from 'icons/arrow-down-small.svg';
import styles from "./Select.module.scss";

const CustomSelect = ({ options, value, className,...other }) => {
  return (
    <div className={cx(styles.root, className)}>
      <Select
        showSearch
        defaultValue={value || (options.length ? options[0].value : '')}
        {...other}
        filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) > -1
        }
      >
        {options.map(option => (
          <Select.Option
            key={option.value}
            value={option.value}
          >
            {option.title}
          </Select.Option>
        ))}
      </Select>
      <ArrowIcon className={styles.arrowDown} />
    </div>
  );
};

export default CustomSelect;
