import React, { useState } from "react";
import cx from "classnames";
import { get } from "lodash";
import moment from "moment";
import { ReactComponent as BedIcon } from "icons/bed.svg";
import { ReactComponent as CalendarIcon } from "icons/calendar.svg";
import { ReactComponent as PlusIcon } from "icons/plusBlue.svg";
import { ReactComponent as ShareIcon } from "icons/share-bare.svg";
import { ReactComponent as EditIcon } from "icons/edit.svg";
import { ReactComponent as HeartIcon } from "icons/heart.svg";
import { ReactComponent as TrashIcon } from "icons/trash.svg";
import { ItineraryTypes } from "helpers/constants";
import styles from "./ItineraryItem.module.scss";

export default function ItineraryItem({
  data,
  actionEnabled,
  selectedHotel,
  currency,
  onDelete,
}) {
  const { title, booking, type, ...items } = data;
  const { start_date, end_date } = selectedHotel;
  const totalRooms = get(booking, "room_count");
  const [showActionBar, setShowActionBar] = useState(false);
  const totalNight = moment(end_date).diff(moment(start_date), "days");
  const avgRate = items.avg_nightly_rate.amount;

  const toggleActionBar = () =>
    setShowActionBar(!showActionBar && actionEnabled);

  return (
    <div className={styles.root}>
      <div className={cx(styles.item, styles.large)}>
        <div className={styles.title}>
          <div className={styles.headIcon}>
            {type === ItineraryTypes.Room && <BedIcon />}
          </div>
          <span>
            {title}
            {` (${totalRooms})`}
          </span>
          {actionEnabled && (
            <span
              className={cx("fa fa-ellipsis-v", styles.ellipsis)}
              onClick={toggleActionBar}
            />
          )}
          {showActionBar && (
            <div className={styles.actionBar}>
              <span
                className={cx("fa fa-close", styles.close)}
                onClick={toggleActionBar}
              />
              <div className={styles.icon} onClick={onDelete}>
                <TrashIcon />
              </div>
              <div className={styles.icon}>
                <HeartIcon />
              </div>
              <div className={styles.icon}>
                <ShareIcon />
              </div>
              <div className={styles.icon}>
                <EditIcon />
              </div>
            </div>
          )}
        </div>
      </div>
      <div className={styles.item}>
        <div>
          <div className={styles.icon}>
            <CalendarIcon />
          </div>
          <span>
            {moment(start_date, "YYYY-MM-DD").format("DD/MM/YYYY")} Check In
          </span>
        </div>
      </div>
      <div className={styles.item}>
        <div>
          <div className={styles.icon}>
            <CalendarIcon />
          </div>
          <span>
            {moment(end_date, "YYYY-MM-DD").format("DD/MM/YYYY")} Check Out
          </span>
        </div>
      </div>
      <div className={styles.item}>
        <div>
          <div className={styles.icon}>
            <PlusIcon />
          </div>
          <span>Resort Fee</span>
        </div>
        <span>{currency?.symbol}00.00</span>
      </div>
      <div className={styles.item}>
        <div>
          <div className={styles.icon}>
            <BedIcon />
          </div>
          <div className={styles.roomDescription}>
            <span className={styles.totalNight}>
              {totalNight} Night{totalNight > 1 && "s"} - {title}
            </span>
            <span className={styles.total}>
              {currency?.symbol}
              {avgRate.toFixed(2) || "0,000.00"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
