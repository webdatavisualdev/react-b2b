import React from 'react';

import styles from './FormWithHeader.module.scss'

export default function FormWithHeader({left, right, children}) {
  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <div className={styles.leftText}>{left}</div>
        <div className={styles.rightText}>{right}</div>
      </div>
      <div className={styles.main}>
        {children}
      </div>
    </div>
  )
}