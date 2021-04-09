import React from 'react';
import moment from 'moment';

import Collapse from 'components/Collapse/Collapse';
import ConfirmationFormHeader from '../ConfirmationFormHeader/ConfirmationFormHeader';
import styles from './ConfirmationDetailForm.module.scss';
import { ReactComponent as CalendarIcon } from 'icons/calendar.svg';
import { ReactComponent as BedIcon } from 'icons/bed3.svg';
import { ReactComponent as PlusIcon } from 'icons/plusBlue.svg';

export default function ConfirmationDetailForm(props) {
  const {roomDetails, index, currency, startDate, endDate, booking_id} = props;
  if(!roomDetails) 
    return null;
  const {name, total, total_base_rate, total_tax_rate} = roomDetails;

  const formatDate = (timestamp) => {
    return moment(new Date(timestamp)).format('DD/MM/YYYY')
  }

  const getAdditional = () => {
    const list = [];
    list.push({title: 'Base rate', price: total_base_rate.amount})
    list.push({title: 'Tax rate', price: total_tax_rate.amount})
    list.push({title: 'Total', price: total.amount})
    return list;
  }
  return (
    <div className={index !== 0 && styles.collapseContainer}>
      <Collapse invert header={(
        <ConfirmationFormHeader icon={(<BedIcon width={15} height={15}/>)} title={name} />
      )}>
        <div className={styles.collapseMain}>
          <div className={styles.confirmation}>Confirmation #: {booking_id}</div>
          <div className={styles.dateRow}>
            <div>
              <CalendarIcon width={15} height={15} />
              <span className={styles.dateText}>{formatDate(startDate) + ' Check-In'}</span>
            </div>
            <div className={styles.endDate}>
              <CalendarIcon width={15} height={15} />
              <span className={styles.dateText}>{formatDate(endDate) + ' Check-Out'}</span>
            </div>
          </div>
          {
            getAdditional().map(item => {
              const {title, price} = item;
              return (
                <div className={styles.otherRow}>
                  <div className={styles.leftRow}>
                    <PlusIcon width={15} height={15} />
                    <div className={styles.label}>{title}</div>
                  </div>
                  <div className={styles.rightText}>
                    {currency?.symbol}{price}
                  </div>
                </div>
              )
            })
          }
        </div>
      </Collapse>
    </div>
  )
}