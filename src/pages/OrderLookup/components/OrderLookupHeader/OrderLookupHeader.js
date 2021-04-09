import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from "react-redux";
import { Button, Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons';

import styles from './OrderLookupHeader.module.scss'
import RightIconInput from 'components/RightIconInput/RightIconInput'
import hotelActions from 'store/hotel/actions';
import {getCancelLookupResponse, getLoading, getError} from 'store/hotel/selectors';
import headerImg from 'images/withBlue.png'
import {ReactComponent as SearchIcon} from 'icons/search.svg'
import {ReactComponent as UserIcon} from 'icons/user.svg'
import { useHistory } from 'react-router-dom';

const antIcon = <LoadingOutlined style={{ fontSize: 24, color: '#003398' }} spin />;

export default function OrderLookupHeader() {
  const [orderNumber, setOrderNumber] = useState('');
  const [lastName, setLastName] = useState('');
  const [errorShow, setErrorShow] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();
  const cancelLookupResponse = useSelector(getCancelLookupResponse);
  const hotelLoading = useSelector(getLoading);
  const error = useSelector(getError);

  useEffect(() => {
    if (cancelLookupResponse.booking_status) {
      history.push('orderSummary');
    }
  }, [cancelLookupResponse, history])

  useEffect(() => {
    if(error) {
      setErrorShow('The order number or last name could not be located. Please try again.')
      dispatch(hotelActions.clearState())
    } else {
      setErrorShow('')
    }
  }, [error, orderNumber, lastName, dispatch])

  const onSearch = () => {
    dispatch(hotelActions.cancelLookup({booking_id: orderNumber, last_name: lastName}));
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <img alt="withBlue" src={headerImg} className={styles.img} />
        <div className={styles.orderTextRow}>
          <div className={styles.searchIconWrapper}>
            <SearchIcon className={styles.searchIcon} />
          </div>
          <div className={styles.orderText}>Order Cancellation Lookup</div>
        </div>
        <div className={styles.orderInput}>
          <RightIconInput
            name="Enter your order number..."
            value={orderNumber}
            onChange={setOrderNumber}
            rightComponent={<div className={styles.orderRightText}>#</div>}
          />
        </div>
        <div className={styles.orderInput}>
          <RightIconInput
            name="Enter your last name..."
            value={lastName}
            onChange={setLastName}
            rightComponent={
              <div className={styles.rightIconWrapper}>
                <UserIcon className={styles.userIcon} />
              </div>
            }
          />
        </div>
        {errorShow ? (
          <div className={styles.errorText}>
            {errorShow}
          </div>
        ) : null}
        <Button onClick={onSearch} className={styles.orderSearchButton}>
          <div className={styles.searchIconWrapper}>
            <SearchIcon className={styles.orderSearchIcon} />
          </div>
          <span className={styles.orderSearchText}>Search</span>
          {hotelLoading ? (
            <Spin indicator={antIcon} />
          ) : null}
        </Button>
      </div>
    </div>
  )
}