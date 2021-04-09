import React from "react";
import { Input, Row, Col, Link } from "antd";
import _ from "lodash";

import { Checkbox } from "components/CheckboxGroup/CheckboxGroup";
import FormItem from "components/FormItem/FormItem";
import Select from "components/Select/Select";
import PrimaryContactForm from "../PrimaryContactForm/PrimaryContactForm";
import { ItineraryTypes } from 'helpers/constants';
import { ReactComponent as BedIcon } from "icons/bed.svg";
import styles from "./AdditionalForm.module.scss";

const { TextArea } = Input;

const genderList = [
  { title: "Male", value: "Male" },
  { title: "Female", value: "Female" },
];

export default function AdditionalForm({ item, index, changeItem, name }) {
  const setValue = (value, key) => {
    const tItem = { ...item };
    tItem[key] = value;
    changeItem(tItem, index);
  };

  let icon;
  switch (item.type) {
    case ItineraryTypes.Room:
      icon = <BedIcon />;
      break;

    default:
      // TODO: put some default icon here
      icon = <BedIcon />;
      break;
  }

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <div className={styles.leftHeader}>
          <div className={styles.imgContainer}>
            <img
              alt={item.title}
              src={item.photos[0]}
              className={styles.image}
            />
            <div className={styles.iconWrapper}>
              {icon}
            </div>
          </div>
          {name}
        </div>
        <Checkbox
          invert
          reverse
          checked={item.primary}
          onChange={(e) => setValue(e.target.checked, "primary")}
        >
          Use Primary Contact
        </Checkbox>
      </div>
      <div className={styles.form}>
        {item.primary ? (
          <div>
            <div className={styles.additionalContainer}>
              <div className={styles.additionalText}>Additional Requests</div>
              <div>
                <a target="_blank" rel="noopener noreferrer" href="https://www.simplenight.com/terms-of-service" className={styles.linkText}>Terms and Conditions</a>
                <a target="_blank" rel="noopener noreferrer" href="https://www.simplenight.com/privacy-policy" className={styles.linkText}>Privacy Policy</a>
              </div>
            </div>
            <TextArea
              rows={3}
              onChange={(e) => setValue(e.target.value, "additionalRequests")}
            />
          </div>
        ) : (
          <div>
            <div className={styles.addContactText}>Add Contact</div>
            <PrimaryContactForm
              index={index}
              primaryContact={item.contact}
              setPrimaryContact={(contact) => setValue(contact, "contact")}
            />
            <hr />
            <div className={styles.addContactText}>Additional Information</div>
            <Row gutter={24}>
              <Col md={12} xs={24}>
                <FormItem
                  label="Flight Number"
                  name={`flightNumber_${index}`}
                  size="large"
                  required
                >
                  <Input
                    placeholder="Flight Number"
                    value={_.get(item, "flightNumber", "")}
                    onChange={(e) => setValue(e.target.value, "flightNumber")}
                  />
                </FormItem>
              </Col>
              <Col md={12} xs={24}>
                <FormItem
                  label="Airline Name"
                  name={`airlineName_${index}`}
                  size="large"
                  required
                >
                  <Input
                    placeholder="Airline Name"
                    value={_.get(item, "airlineNumber", "")}
                    onChange={(e) => setValue(e.target.value, "airlineNumber")}
                  />
                </FormItem>
              </Col>
              <Col md={12} xs={24}>
                <FormItem
                  label="Gender"
                  name={`gender_${index}`}
                  size="large"
                  required
                >
                  <Select
                    options={genderList}
                    value={_.get(item, "gender", "")}
                    onChange={(value) => setValue(value, "gender")}
                  />
                </FormItem>
              </Col>
            </Row>
            <div className={styles.additionalText}>Additional Requests</div>
            <TextArea
              rows={3}
              onChange={(e) => setValue(e.target.value, "additionalRequests")}
            />
          </div>
        )}
      </div>
    </div>
  );
}
