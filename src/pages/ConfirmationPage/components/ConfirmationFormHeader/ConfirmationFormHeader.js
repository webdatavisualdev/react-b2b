import React from 'react';

import styles from './ConfirmationFormHeader.module.scss'

export default function ConfirmationFormHeader({icon, title}) {
  return (
    <div className={styles.root}>
      <div className={styles.circle}>
        {icon}
      </div>
      <div className={styles.text}>
        {title}
      </div>
    </div>
  )
}