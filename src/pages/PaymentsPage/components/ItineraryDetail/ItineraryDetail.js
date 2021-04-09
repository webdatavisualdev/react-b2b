import React from "react";
import { useSelector, useDispatch } from "react-redux";
import cx from "classnames";
import DiscountForm from "../DiscountForm/DiscountForm";
import ItineraryItem from "../ItineraryItem/ItineraryItem";
import bookingActions from "store/booking/actions";
import {
  getSelectedHotel,
  getTotalBookingAmount,
} from "store/booking/selectors";
import styles from "./ItineraryDetail.module.scss";

export default function ItineraryDetail({
  items,
  showDiscount,
  drawerChild,
  currency,
}) {
  const totalAmount = useSelector(getTotalBookingAmount);
  const selectedHotel = useSelector(getSelectedHotel);
  const dispatch = useDispatch();

  const handleDelete = (index) => () => {
    if (items.length > 1) {
      dispatch(bookingActions.removeItineraryItem(index));
    }
  };

  return (
    <div className={`${styles.root} ${drawerChild ? styles.drawer : ""}`}>
      <div className={styles.header}>
        <h5>
          {" "}
          <span>${totalAmount.toFixed(2) || "0,000.00"}</span>TOTAL
        </h5>
        <span>
          <b>{items.length}</b> {items.length > 1 ? "ite ms" : "item"}
        </span>
      </div>
      {showDiscount && <DiscountForm className={styles.discountForm} />}
      <div
        className={cx(styles.items, {
          [styles.noBorder]: !showDiscount,
        })}
      >
        {items.map((item, index) => (
          <ItineraryItem
            data={item}
            actionEnabled={items.length > 1}
            key={`itinaryItem_${index}`}
            selectedHotel={selectedHotel}
            currency={currency}
            onDelete={handleDelete(index)}
          />
        ))}
      </div>
      {drawerChild && (
        <div className={styles.totalWrapper}>
          <div className={styles.wrapper}>
            <span className={styles.total}>
              {currency?.symbol}
              {totalAmount.toFixed(2) || "0,000.00"}
            </span>
            <span className={styles.totalText}>TOTAL</span>
          </div>
          <button className={styles.checkLink}>Check Out</button>
        </div>
      )}
    </div>
  );
}
