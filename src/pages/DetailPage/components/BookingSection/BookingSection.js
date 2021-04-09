import React, { useState, useEffect } from "react";
import { Button } from "antd";
import cx from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import moment from "moment";
import { FormattedMessage } from "react-intl";
import NumberInput from "components/NumberInput/NumberInput";
import DatePicker from "components/DatePicker/DatePicker";
import Divider from "components/Divider/Divider";
import { ReactComponent as CloseIcon } from "icons/close-fill.svg";
import hotelActions from "store/hotel/actions";
import { getCurrency } from "store/core/selectors";
import { commaFormat } from "utils/helperMethods";
import styles from "./BookingSection.module.scss";
import { Currencies } from "helpers/constants";

export default function BookingSection({
  className,
  nights,
  selectedRooms,
  onRemoveRoom,
  onBookClick,
  setSelectedRooms,
  occupancy,
  startDate,
  endDate
}) {
  const [bookFormValue, setBookFormValue] = useState({});
  const [showError, toggleError] = useState(null);
  const dispatch = useDispatch();
  const params = useParams();
  const currency = useSelector(getCurrency);
  const totalCost = selectedRooms.reduce((accumulator, room) => {
    const roomCost =
      room.total && room.total.amount > 0 ? Number(room.total.amount) : 0;
    return accumulator + roomCost * room.roomCount;
  }, 0);
  const currencySymbol = Currencies[selectedRooms[0]?.total?.currency || 'USD']?.symbol

  useEffect(() => {
    if(startDate && endDate) {
      if(startDate !== bookFormValue.startDate && endDate !== bookFormValue.endDate) {
        console.log('startDate', startDate)
        console.log('endDate', endDate)
        setBookFormValue({
          ...bookFormValue,
          checkIn: startDate,
          checkOut: endDate
        })
      }
    }
  }, [startDate, endDate])

  const handleBookFormChange = (name) => (value) => {
    setBookFormValue({
      ...bookFormValue,
      [name]: value,
    });
  };

  const onSearch = () => {

  const start_date = bookFormValue.checkIn
    ? moment(bookFormValue.checkIn).format("YYYY-MM-DD")
    : moment().format("YYYY-MM-DD");

  const end_date = bookFormValue.checkOut
    ? moment(bookFormValue.checkOut).format("YYYY-MM-DD")
    : moment().add(1, "day").format("YYYY-MM-DD");
    const payload = {
      hotel_id: params.id,
      start_date: start_date,
      end_date: end_date,
      occupancy: {
        adults: bookFormValue.adultCount || 1,
        children: bookFormValue.childrenCount || 0,
        num_rooms: bookFormValue.roomCount || 1,
      },
      language: "en",
      currency: currency.value,
    };
    dispatch(hotelActions.searchHotelById(params.id, payload));
    setSelectedRooms([]);
  };

  const onBookNowClick = () => {
    if (selectedRooms.length) {
      onBookClick && onBookClick();
    } else {
      toggleError(true);
    }
  };

  return (
    <div className={cx(styles.root, className)}>
      <div className={styles.bookContent}>
        <h4><FormattedMessage id="detailPage.modifySearch" /></h4>
        <div className={styles.adultChildWrapper}>
          <div className={styles.adult}>
            <NumberInput defaultValue={2} onChange={handleBookFormChange('adultCount')} />
            <span>
              <FormattedMessage id="adult" />
            </span>
          </div>
          <div className={styles.child}>
            <NumberInput defaultValue={0} onChange={handleBookFormChange('childrenCount')} />
            <span>
              <FormattedMessage id="children" defaultMessage="Children" />
            </span>
          </div>
        </div>
        <Divider margin={20} />
        <div>
          <NumberInput
            defaultValue={1}
            onChange={handleBookFormChange("roomCount")}
          />
          <span>
            <FormattedMessage id="rooms" defaultMessage="Rooms" />
          </span>
        </div>
        <Divider margin={20} />
        <div className={styles.checkInOut}>
          <div>
            <span>
              <FormattedMessage id="checkIn" defaultMessage="Check In" />
            </span>
            {bookFormValue.checkIn && (
              <DatePicker
                defaultValue={bookFormValue.checkIn || moment()}
                value={bookFormValue.checkIn}
                onChange={handleBookFormChange("checkIn")}
              />
            )}
          </div>
          <div>
            <span>
              <FormattedMessage id="checkOut" defaultMessage="Check Out" />
            </span>
            <DatePicker
              defaultValue={bookFormValue.checkOut || moment().add(1, "day")}
              value={bookFormValue.checkOut}
              onChange={handleBookFormChange("checkOut")}
            />
          </div>
        </div>
        <Divider margin={20} />
        <Button className={styles.addToItinerary} onClick={onSearch}>
          <FormattedMessage id="search" defaultMessage="Search" />
        </Button>
        <Divider margin={20} />
        <div className={styles.yourOrder}>
          <span>
            <FormattedMessage id="yourOrder" defaultMessage="Your Order" />
          </span>
          {selectedRooms.map((room) => (
            <div key={room.id}>
              {occupancy.num_rooms} {room.name}
              <span>
                {nights > 1 ? (
                  <FormattedMessage
                    id="detailPage.bookingSection.nights"
                    values={{ nights }}
                  />
                ) : (
                  <FormattedMessage
                    id="detailPage.bookingSection.night"
                    values={{ nights }}
                  />
                )}
                <CloseIcon onClick={onRemoveRoom(room.code, true)} />
              </span>
            </div>
          ))}
        </div>
        <div className={styles.total}>
          <span>
            <FormattedMessage id="total" defaultMessage="Total" />
          </span>
          <span className={styles.totalCost}>
            {currencySymbol}
            {commaFormat((totalCost || 0).toFixed(2))}
          </span>
        </div>
      </div>
      {showError && (
        <p className={styles.errorText}>
          <FormattedMessage
            id="detailPage.bookingSection.noRoomsError"
            defaultMessage="Please select a room"
          />
        </p>
      )}
      <Button className={styles.bookNow} onClick={onBookNowClick}>
        <FormattedMessage id="bookNow" defaultMessage="Book Now" />
      </Button>
    </div>
  );
}
