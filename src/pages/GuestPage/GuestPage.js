import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Form } from "antd";
import history from "store/history";
import ItineraryDetail from "../PaymentsPage/components/ItineraryDetail/ItineraryDetail";
import Page from "components/Page/Page";
import bookingActions from "store/booking/actions";
import Button from "components/Button/Button";
import Drawer from "components/Drawer/Drawer";
import GuestHeader from "./components/GuestHeader/GuestHeader";
import AdditionalForm from "./components/AdditionalForm/AdditionalForm";
import PrimaryContactFormContainer from "./components/PrimaryContactFormContainer/PrimaryContactFormContainer";
import {
  getBookingPayload,
  getSelectedHotel,
  getSelectedRoomItems,
  getTotalBookingAmount,
} from "store/booking/selectors";
import { getCurrency } from "store/core/selectors";
import styles from "./GuestPage.module.scss";

export default function GuestPage() {
  const formKey = "guestInformation";
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const bookings = useSelector(getBookingPayload);
  const selectedHotel = useSelector(getSelectedHotel);
  const selectedRooms = useSelector(getSelectedRoomItems);
  const totalAmount = useSelector(getTotalBookingAmount);
  const currency = useSelector(getCurrency);
  const [primaryContact, setPrimaryContact] = useState({});
  const [phoneError, setPhoneError] = useState('');
  const [buttonClicked, setButtonClicked] = useState(false);
  // set primary checked to true as default
  const [items, setItems] = useState(
    (selectedRooms || []).map((v) => {
      v.primary = true;
      return v;
    })
  );

  if (!bookings) {
    history.push("hotels");
  }

  const changeItem = (cItem, index) => {
    const tItem = [...items];
    tItem[index - 1] = cItem;
    setItems(tItem);
  };


  const isNumber = (numberStr) => {
    let flag = true;
    for (let i=0; i<numberStr.length; i++) {
      if(numberStr[i] >= '0' && numberStr[i] <= '9') {}
      else {
        flag = false;
      }
    }
    return flag;
  }

  const handleFormSubmit = async () => {
    try {
      setButtonClicked(true);
      await form.validateFields();

      if(!isNumber(primaryContact.phone)) {
        setPhoneError('Please input only number in this field')
        return;
      }

      const allConatct = { primaryContact, items };
      dispatch(bookingActions.setGuestContactInformation(allConatct));

      history.push("payments");
    } catch (error) {
      console.error(error);
    }
  };

  const goBack = () => {
    history.push(`hotels/${selectedHotel.hotel_id}`);
  };

  return (
    <Page>
      <Form form={form} name={formKey} layout="vertical">
        <GuestHeader />
        <div className={styles.content}>
          <Row gutter={24}>
            <Col md={{ span: 16 }} xs={{ span: 24 }}>
              <PrimaryContactFormContainer
                primaryContact={primaryContact}
                setPrimaryContact={setPrimaryContact}
                phoneError={phoneError}
              />
              {items.map((item, index) => (
                <div
                  key={`additionalForm_${index + 1}`}
                  className={styles.detail}
                >
                  <AdditionalForm
                    item={item}
                    index={index + 1}
                    changeItem={changeItem}
                    name={selectedHotel.hotel_details.name}
                  />
                </div>
              ))}
            </Col>
            <Col md={{ span: 8 }} xs={{ span: 0 }}>
              <ItineraryDetail items={selectedRooms} currency={currency} />
            </Col>
          </Row>
        </div>
        <div className={styles.bottom}>
          <div className={styles.wrapper}>
            <div className={styles.totalSection}>
              <span>
                {currency?.symbol} {totalAmount.toFixed(2)}
              </span>
              <span>Total</span>
            </div>
            <div className={styles.backCheckoutBtn}>
              <Button size="large" invert onClick={goBack}>
                Back
              </Button>
              <Button disabled={buttonClicked} size="large" onClick={handleFormSubmit}>
                Check Out
              </Button>
            </div>
          </div>
        </div>
        <Drawer
          header={
            <div className={styles.drawerHeader}>
              <div className={styles.drawalTotalSection}>
                <span>
                  {currency?.symbol} {totalAmount.toFixed(2)}
                </span>
                <span>Total</span>
              </div>
              <span>
                <b>{items.length || 0}</b> Items
              </span>
            </div>
          }
          footer={
            <div className={styles.drawerBottom}>
              <div className={styles.drawalTotalSection}>
                <span>
                  {`${currency?.symbol} ${totalAmount.toFixed(2)}`}
                </span>
                <span>Total</span>
              </div>
              <Button disabled={buttonClicked} size="large" onClick={handleFormSubmit}>
                Check Out
              </Button>
            </div>
          }
        >
          <ItineraryDetail items={selectedRooms} currency={currency} />
        </Drawer>
      </Form>
    </Page>
  );
}
