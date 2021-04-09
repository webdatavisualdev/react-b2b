import React from 'react';
import cx from 'classnames';
import HotelItem from 'components/HotelItem/HotelItem';
import DetailHeader from '../DetailHeader/DetailHeader';
import styles from './OtherSection.module.scss';

export default function OtherSection({ className, currency }) {
  return (
    <div className={cx(styles.root, className)}>
      <DetailHeader
        headerOnly
        className={styles.detailHeader}
        title='Others You May Like'
      />
      <div className={styles.content}>
        <HotelItem currency={currency} />
        <HotelItem currency={currency} />
        <HotelItem currency={currency} />
      </div>
    </div>
  );
}