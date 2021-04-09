import React from "react";
import { Row, Col } from "antd";
import { useSelector } from "react-redux";
import _ from "lodash";

import { getCurrency } from "store/core/selectors";
import Page from "components/Page/Page";
import Button from "components/Button/Button";
import {
  getBookingPayload,
  getBookingHotelPayload,
  getPaymentPayload,
} from "../../store/booking/selectors";
import { getSelectedHotel } from "../../store/hotel/selectors";
import ConfirmationLeft from "./components/ConfirmationLeft/ConfirmationLeft";
import ConfirmationRight from "./components/ConfirmationRight/ConfirmationRight";
import ConfirmationHeader from "./components/ConfirmationHeader/ConfirmationHeader";
import ConfirmationBottom from "./components/ConfirmationBottom/ConfirmationBottom";
import styles from "./ConfirmationPage.module.scss";

export default function ConfirmationPage() {
  const preSelectedRooms = useSelector(getBookingPayload);
  const bookingHotelPayload = useSelector(getBookingHotelPayload);
  const paymentPayload = useSelector(getPaymentPayload);
  const currency = useSelector(getCurrency);
  const selectedHotel = useSelector(getSelectedHotel);

  const getHeaderItems = () => {
    const list = [];
    preSelectedRooms.hotel_id &&
      list.push({
        label: "ORDER NUMBER",
        value: _.get(bookingHotelPayload, "reservation.locator.id", ""),
      });
    preSelectedRooms.room_rate &&
      list.push({ label: "ITEMS", value: preSelectedRooms.room_rate.length });
    let total = 0;
    preSelectedRooms.room_rate.forEach((each) => {
      total += parseFloat(_.get(each, "roomDetails.total.amount", 0), 0);
    });
    preSelectedRooms.room_rate &&
      list.push({ label: "TOTAL", value: total.toFixed(2) });
    return list;
  };

  return (
    <Page>
      <ConfirmationHeader items={getHeaderItems()} currency={currency} />
      <div className={styles.content}>
        <Row gutter={24}>
          <Col span={16} xs={24}>
            <ConfirmationLeft
              selectedHotel={selectedHotel}
              hotelDetail={preSelectedRooms.room_rate}
              bookingHotelPayload={bookingHotelPayload}
              currency={currency}
            />
          </Col>
          <Col span={8} xs={24}>
            <ConfirmationRight
              paymentPayload={paymentPayload}
              bookingHotelPayload={bookingHotelPayload}
              currency={currency}
            />
          </Col>
        </Row>
        <ConfirmationBottom currency={currency} />
      </div>
      <div className={styles.buttonsGroup}>
        <div className={styles.leftButton}>
          <Button size="large" invert>
            Continue Shopping
          </Button>
        </div>
        <Button size="large">View All Orders</Button>
      </div>
    </Page>
  );
}
