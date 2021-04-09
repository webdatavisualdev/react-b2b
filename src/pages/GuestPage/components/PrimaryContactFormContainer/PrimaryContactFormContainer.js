import React from "react";
import { Row, Col } from "antd";

import { ReactComponent as InfoIcon } from "icons/info.svg";
import PrimaryContactForm from "../PrimaryContactForm/PrimaryContactForm";
import styles from "./PrimaryContactFormContainer.module.scss";
import { Checkbox } from "components/CheckboxGroup/CheckboxGroup";

export default function PrimaryContactFormContainer({
  primaryContact,
  setPrimaryContact,
  phoneError
}) {
  return (
    <div className={styles.root}>
      <div className={styles.header}>Primary Contact</div>
      <div className={styles.form}>
        <PrimaryContactForm
          index={0}
          primaryContact={primaryContact}
          setPrimaryContact={setPrimaryContact}
          phoneError={phoneError}
        />
        <div className={styles.info}>
          <Row gutter={24}>
            <Col span={12} xs={24}>
              <div className={styles.infoLeft}>
                <Checkbox>Create account from Primary Contact</Checkbox>
              </div>
            </Col>
            <Col span={12} xs={24}>
              <div className={styles.infoRight}>
                <InfoIcon className={styles.infoIcon} />
                <span>
                  Primary Contact is the lead traveler going on the tour. This
                  name needs to match the name on the voucher for the tour
                  operator.
                </span>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}
