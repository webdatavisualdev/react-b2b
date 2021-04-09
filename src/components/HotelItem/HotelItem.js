import React from 'react';
import cx from 'classnames';
import { getRandomImageUrl } from 'helpers/utils';
import Rating from 'components/Rating/Rating';
import styles from './HotelItem.module.scss';

export default function HotelItem({ className, currency }) {
  return (
    <div className={cx(styles.root, className)}>
      <div className={styles.banner}>
        <img src={getRandomImageUrl()} alt='other hotel item' />
      </div>
      <div className={styles.content}>
        Four Seasons
        <Rating
          scoreonly
          outlined
          score={Math.round(Math.random() * 5)}
          className={styles.row}
        />
        <span className={styles.description}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec orci enim, luctus vel nisl Bibendum.
        </span>
        <div className={styles.row}>
          FROM
          <span>{currency?.symbol}19.99</span>
        </div>
      </div>
    </div>
  );
}