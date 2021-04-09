import React from 'react';
import { Steps, Step } from 'components/Steps/Steps';
import styles from './GuestHeader.module.scss';

export default function GuestHeader() {
  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <span>Guest Information</span>
        <Steps className={styles.steps} current={0} labelPlacement="vertical">
          <Step className={styles.step} title="Guests" />
          <Step title="Payment" />
        </Steps>
      </div>
    </div>
  );
}
