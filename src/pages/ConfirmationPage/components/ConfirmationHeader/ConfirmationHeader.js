import React from 'react';
import Button from 'components/Button/Button';
import styles from './ConfirmationHeader.module.scss'

export default function ConfirmationHeader({items}) {
  return (
    <div className={styles.root}>
      <div className={styles.main}>
        <div className={styles.left}>
          <span className={styles.tick}>✓</span>
          <span>Order Confirmed</span>
        </div>
        <div className={styles.right}>
          {
            items.map(item => (
              <div key={item.label} className={styles.item}>
                <div className={styles.label}>{item.label}</div>
                <div className={styles.value}>{item.value.toString()}</div>
              </div>
            ))
          }
          <div className={styles.button}>
            <Button>
              <div>
                Share
              </div>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
