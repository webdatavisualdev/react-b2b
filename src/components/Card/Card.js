import React from 'react';

import Rating from 'components/Rating/Rating';
import styles from './Card.module.scss';

export default function Card({img, title, rate, Icon, description, price}) {
  return (
    <div className={styles.root}>
      <img src={img} alt={title} />
      <div className={styles.icon}>
        <Icon />
      </div>
      <div className={styles.main}>
        <div className={styles.title}>{title}</div>
        <div className={styles.rating}>
          <Rating score={rate} scoreonly outlined />
        </div>
        <div className={styles.description}>
          {description}
        </div>
        <div className={styles.priceRow}>
          <div>FROM</div>
          <div className={styles.price}>
            {price}
          </div>
        </div>
      </div>
    </div>
  )
}