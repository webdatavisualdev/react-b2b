import React from 'react';
import styles from './Footer.module.scss';

const Footer = () => {
  return (
    <div className={styles.root}>
      <span>© 2019 United Airlines</span>
      <div>
        <span>Powered by</span>
        <span className={styles.company}>SIMPLENIGHT</span>
      </div>
      <span>Policy & Agreement | Privacy Policy</span>
    </div>
  );
}

export default Footer;
