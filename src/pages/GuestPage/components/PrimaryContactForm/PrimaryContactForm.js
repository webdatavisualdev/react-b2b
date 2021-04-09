import React, { useEffect, useState } from "react";
import { Row, Col, Input, InputNumber } from "antd";
import _ from "lodash";
import countryList from "country-list";

import FormItem from "components/FormItem/FormItem";
import Select from "components/Select/Select";
import styles from "./PrimaryContactForm.module.scss";

export default function PrimaryContactForm({
  index,
  primaryContact,
  setPrimaryContact,
  phoneError,
}) {
  const [countrySelectList, setCountrySelectList] = useState([]);

  const setValue = (value, key) => {
    const temp = { ...primaryContact };
    temp[key] = value;
    setPrimaryContact(temp);
  };

  useEffect(() => {
    const list = countryList.getNameList();
    const keys = Object.keys(list);
    let tmpList = [];
    tmpList = keys.map((key) => {
      return { title: key.toUpperCase(), value: list[key] };
    });
    setCountrySelectList(tmpList);
  }, []);
  console.log('phoneError', phoneError)
  return (
    <div className={styles.root}>
      <div className={styles.summary}>
        <Row gutter={24}>
          <Col span={12} xs={24}>
            <FormItem
              label="First Name"
              name={`firstName_${index}`}
              size="large"
              required
            >
              <Input
                placeholder="First Name"
                value={_.get(primaryContact, "firstName", "")}
                onChange={(e) => setValue(e.target.value, "firstName")}
              />
            </FormItem>
          </Col>
          <Col span={12} xs={24}>
            <FormItem
              label="Last Name"
              name={`lastName_${index}`}
              size="large"
              required
            >
              <Input
                placeholder="Last Name"
                value={_.get(primaryContact, "lastName", "")}
                onChange={(e) => setValue(e.target.value, "lastName")}
              />
            </FormItem>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={12} xs={24}>
            <FormItem
              label="Country"
              name={`country_${index}`}
              size="large"
              required
            >
              <Select
                options={countrySelectList}
                onChange={(value) => setValue(value, "country")}
              />
            </FormItem>
          </Col>
          <Col span={12} xs={24}>
            <FormItem
              label="Phone Number"
              name={`phoneNumber_${index}`}
              size="large"
              required
            >
              <Input
                placeholder="Phone Number"
                value={_.get(primaryContact, "phone", "")}
                onChange={(e) => setValue(e.target.value, "phone")}
              />
            </FormItem>
            <span className={styles.errorText}>{phoneError}</span>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={24}>
            <FormItem
              label="Email Address"
              name={`email_${index}`}
              size="large"
              required
            >
              <Input
                placeholder="Email Address"
                value={_.get(primaryContact, "email", "")}
                onChange={(e) => setValue(e.target.value, "email")}
              />
            </FormItem>
          </Col>
        </Row>
      </div>
    </div>
  );
}
