import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Form, Input, notification, Row, Col } from "antd";
import cx from "classnames";
import { v4 as uuidv4 } from 'uuid';

import { getFormSubmitted } from "store/core/selectors";
import FormItem from "components/FormItem/FormItem";
import { Checkbox } from "components/CheckboxGroup/CheckboxGroup";
import Select from "components/Select/Select";
import PaypalImg from "icons/paypal-logo.png";
import AlipayImg from "icons/alipay-logo.png";
import VenmoImg from "icons/venmo-logo.png";
import WechatImg from "icons/wechat-logo.png";
import BitcoinImg from "icons/bitcoin-logo.png";
import ApplepayImg from "icons/applepay-logo.png";
import ChaseImg from "icons/chase-logo.png";
import amexImg from "icons/card-icons/amex.png";
import jcbImg from "icons/card-icons/jcb.png";
import mastercardImg from "icons/card-icons/mastercard.png";
import unionpayImg from "icons/card-icons/unionpay.png";
import visaImg from "icons/card-icons/visa.png";
import styles from "./PaymentsForm.module.scss";
import {
  getBookingPayload,
  getGuestContactInformation,
  getBookingHotelPayload,
  getTotalBookingAmount
} from "store/booking/selectors";
import bookingActions from "store/booking/actions";
import history from "store/history";

const stripePromise = loadStripe("pk_live_G9QVMp1nE2XgMKFY8FL8nEP2");

const providers = [
  { id: "credit", title: "credit/debit" },
  { id: "paypal", icon: PaypalImg, disabled: true },
  { id: "venmo", icon: VenmoImg, disabled: true },
  { id: "applepay", icon: ApplepayImg, disabled: true },
  { id: "chase", icon: ChaseImg, disabled: true },
  { id: "wechat", icon: WechatImg, disabled: true },
  { id: "alipay", icon: AlipayImg, disabled: true },
  { id: "bitcoin", icon: BitcoinImg, disabled: true },
];
const cardImages = {
  amex: amexImg,
  jcb: jcbImg,
  mastercard: mastercardImg,
  unionpay: unionpayImg,
  visa: visaImg,
  cartes_bancaires: mastercardImg,
  diners_club: mastercardImg,
  discover: mastercardImg,
};
const options = [
  { title: "Card 1", value: "value1" },
  { title: "Card 2", value: "value2" },
  { title: "Card 3", value: "value3" },
];
const cardElOptions = {
  style: {
    base: {
      color: "#7b7c7e",
      fontWeight: 500,
      fontFamily: '"Lato", sans-serif',
      fontSize: "14px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": { color: "#bbbbbb" },
      "::placeholder": { color: "#bbbbbb" },
    },
    invalid: {
      color: "#7b7c7e",
    },
  },
};

function PaymentsForm({ formKey, setButtonClicked }) {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const formSubmitted = useSelector(getFormSubmitted);
  const payload = useSelector(getBookingPayload);
  const guestContact = useSelector(getGuestContactInformation);
  const bookingHotelPayload = useSelector(getBookingHotelPayload);
  const totalAmount = useSelector(getTotalBookingAmount);
  const stripe = useStripe();
  const elements = useElements();
  const formSubmit = useRef(formSubmitted[formKey]);
  const [cardBrand, setCardBrand] = useState("");

  const originalStRules = {
    cardNumber: {
      message: " ",
    },
    expiryDate: {
      message: " ",
    },
    cvv: {
      message: " ",
    },
  };
  const stRules = useRef(originalStRules);

  useEffect(() => {
    if(bookingHotelPayload) {
      history.push("confirmation");
    }
  }, [bookingHotelPayload]);

  const handleSubmit = async (data) => {
    console.log('start handdleSubmit')
    try {
      const cardNumberEl = elements.getElement(CardNumberElement);

      const response = await stripe.createToken(cardNumberEl);
      console.log('response', response)
      if (response.error) {
        console.log('response.error', response.error)
        notification.open({
          key: "bookingFormVerification",
          message: "Error",
          description: response?.error?.message || "Form Data is invalid",
        });
        setButtonClicked(false);
      } else {
        const bookingPayload = {
          api_version: 1,
          transaction_id: uuidv4(),
          hotel_id: payload.hotel_id,
          room_code: payload.room_rate[0].code, // there could be many rooms so why room code is only one?
          language: 'en_US',
          customer: {
            first_name: guestContact.primaryContact.firstName,
            last_name: guestContact.primaryContact.lastName,
            phone_number: guestContact.primaryContact.phone,
            email: guestContact.primaryContact.email,
            country: guestContact.primaryContact.country,
          },
          traveler: {
            first_name: guestContact.primaryContact.firstName,
            last_name: guestContact.primaryContact.lastName,
            occupancy: {
              adults: 2,
              children: 0
            }
          },
          payment: {
            payment_method: 'PAYMENT_TOKEN', // is this brand right?
            payment_token: response.token.id,
          }
        }
        dispatch(bookingActions.bookingHotel(bookingPayload));
        dispatch(bookingActions.setPaymentTokenPayload(response));
        setButtonClicked(false);
      }
    } catch(err) {
      console.log('handleSubmit err', err)
      // alert(err?.message || err)
      notification.open({
        key: "bookingFormVerification",
        message: "Error",
        description: err?.message || err,
      });
      setButtonClicked(false);
    }
  };

  const onFormChange = (e) => {
    // card image update
    if (e.brand) {
      setCardBrand(e.brand !== "unknown" ? e.brand : "");
    }

    const stFieldNames = ["cardNumber", "expireDate", "cvv"];
    if (stFieldNames.includes(e.elementType) && !!e.error) {
      stRules.current[e.elementType] = {
        message: e.error.message,
      };
    }
  };

  const stValidate = (rule, value, callback) => {
    let errorMessage = "";
    if (stRules.current) {
      errorMessage = stRules.current[rule.field].message;
    }
    callback(errorMessage);
  };

  useEffect(() => {
    if (formSubmitted[formKey] !== formSubmit.current) {
      form.submit();
      formSubmit.current = formSubmitted[formKey];
    }
  }, [form, formKey, formSubmitted]);

  return (
    <Form
      className={styles.form}
      layout="vertical"
      form={form}
      name={formKey}
      onFinish={handleSubmit}
      initialValues={{
        'amount': totalAmount
      }}
    >
      <Row>
        <Col md={12} xs={24}>
          <FormItem className={styles.leftItem} name="cardName" label="Name on Card" size="large" required>
            <Input placeholder="Enter name on credit card..." />
          </FormItem>
        </Col>
        <Col md={12} xs={24}>
          <FormItem
            label="Card Number"
            size="large"
            className={cx(styles.stField, styles.cardNumber, styles.margin, {
              [styles.error]: !!stRules.current.cardNumber.message,
            })}
            rules={[{ validator: stValidate }]}
            noForm
            required
          >
            <CardNumberElement options={cardElOptions} onChange={onFormChange} />
            {cardBrand && <img src={cardImages[cardBrand]} alt="Card Flag" />}
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col md={12} xs={24} className={styles.cvvWrapper}>
          <FormItem
            noForm
            label="Card Expiration"
            size="large"
            className={cx(styles.stField, styles.margin, {
              [styles.error]: !!stRules.current.expiryDate.message,
            })}
            rules={[{ validator: stValidate }]}
            required="Req"
          >
            <CardExpiryElement options={cardElOptions} />
          </FormItem>
        </Col>
        <Col md={12} xs={24}>
          <FormItem
            label="Card CVV"
            size="large"
            className={cx(styles.stField, {
              [styles.error]: !!stRules.current.cvv.message,
            })}
            rules={[{ validator: stValidate }]}
            required="Req"
          >
            <CardCvcElement options={cardElOptions} />
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col md={12} xs={24}>
        <FormItem
          className={styles.leftItem}
          name="amount"
          label="Amount for This Card"
          size="large"
          required="Req"
        >
          <Input
            placeholder="Enter amount to split with this card..."
            type="number"
            defaultValue={totalAmount}
            value={totalAmount}
          />
        </FormItem>
        </Col>
      </Row>
    </Form>
  );
}

function PaymentsFormSection({ title, formKey, setButtonClicked }) {
  const [activeProvider, setActiveProvider] = useState("credit");
  const handleCardChange = (e) => {
    // console.log(e)
  };

  return (
    <Elements stripe={stripePromise} onChange={handleCardChange}>
      <div className={styles.root}>
        <div className={styles.title}>{title}</div>
        <div className={styles.providers}>
          {providers.map((provider) => (
            <div
              id={provider.id}
              className={cx({
                [styles.active]: activeProvider === provider.id,
                [styles.disabled]: provider.disabled,
              })}
              onClick={() =>
                !provider.disabled && setActiveProvider(provider.id)
              }
            >
              {provider.title}
              {provider.icon && <img src={provider.icon} alt="Payment Icon" />}
            </div>
          ))}
        </div>
        <PaymentsForm formKey={formKey} setButtonClicked={setButtonClicked} />
        <div className={styles.saveInfo}>
          <Checkbox invert size="large" value={true} onChange={() => {}}>
            Save card information to my account
          </Checkbox>
          <Select
            options={options}
            placeholder="Select a card saved to your account..."
          />
        </div>
      </div>
    </Elements>
  );
}

export default PaymentsFormSection;
