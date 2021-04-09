import React from "react";
import cx from 'classnames';
import { ReactComponent as StarIcon } from "icons/star.svg";
import { ReactComponent as StarGrayIcon } from "icons/star_gray.svg";
import { ReactComponent as StarOutlinedIcon } from "icons/star-outline.svg";
import { ReactComponent as SimplenightIcon } from "icons/simplenight.svg";
import styles from "./Rating.module.scss";

const onStarClick = (score, isCancel, onChange) => () => {
  if (onChange) {
    onChange(isCancel ? 0 : score);
  }
};

const generateStars = (score, size, outlined, onChange) => {
  const result = [];
  const Star = StarIcon;
  const StarGrey = outlined ? StarOutlinedIcon : StarGrayIcon;

  for (let i = 0; i < 5; i++) {
    if (score >= i + 1) {
      result.push(
        <Star
          key={`star_${i}`}
          width={size}
          height={size}
          className={styles.star}
          onClick={onStarClick(i + 1, score === i + 1, onChange)}
        />
      );
    } else {
      result.push(
        <StarGrey
          key={`star_grey_${i}`}
          width={size}
          height={size}
          className={styles.star}
          onClick={onStarClick(i + 1, score === i + 1, onChange)}
        />
      );
    }
  }
  return result;
};

const Rating = ({
  scoreonly,
  outlined,
  score,
  size = 24,
  className,
  onChange,
}) => (
  <div className={cx(styles.rating, className, { 
    [styles.disabled]: !onChange
  })}>
    {generateStars(score, size, outlined, onChange)}
    {!scoreonly &&
      <>
        <span className={styles.count}>{(Math.random() * 100).toFixed()}</span>

        <div className={styles.simplenightIcon}>
          <SimplenightIcon />
        </div>
        <div className={styles.textRating}>
          <span className={styles.ratingValue}>{score}</span> / 5
        </div>
        <span>User Rating</span>
      </>
    }
  </div>
);

export default Rating;
