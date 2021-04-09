import React from 'react';
import cx from 'classnames';
import { DatePicker } from 'antd';
import { ReactComponent as CalendarIcon } from 'icons/calendar.svg';
import { ReactComponent as CloseIcon } from 'icons/close-fill-large.svg';
import styles from  './DatePicker.module.scss';

const CustomDatePicker = ({ className, ...other }) => {
  return (
    <DatePicker
      {...other}
      suffixIcon={<CalendarIcon width={20} height={20} />}
      className={cx(styles.root, className)}
      clearIcon={<CloseIcon />}
    />
  );
}

export default CustomDatePicker;