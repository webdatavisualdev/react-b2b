import React from 'react';
import styles from './Divider.module.scss';

const Divider = ({ margin = 18 }) => {
  return (
    <div
      style={{ margin: `${margin}px 0` }}
      className={styles.root}
    />
  );
}

export default Divider;