import React from 'react';
import { Tag } from 'antd';
import cx from 'classnames';
import styles from './Tag.module.scss';

const CustomTag = ({ text, icon, color }) => {
  return (
    <div className={styles.root}>
      <Tag 
        icon={icon}
        color={color}
        className={cx({
          [styles.withIcon]: !!color,
          [styles.iconOnly]: !!icon && !text,
        })}
      >
          {text}
        </Tag>
    </div>
  );
}

export default CustomTag;