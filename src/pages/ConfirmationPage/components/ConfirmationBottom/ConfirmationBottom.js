import React from "react";
import { Row, Col } from "antd";

import Card from "components/Card/Card";
import Button from "components/Button/Button";
import { ReactComponent as SimpleNight } from "icons/simplenightWight.svg";
import { ReactComponent as Restaurant } from "icons/restaurantWhite.svg";
import styles from "./ConfirmationBottom.module.scss";

export default function ConfirmationBottom({ currency }) {
  return (
    <div className={styles.root}>
      <div className={styles.topRow}>
        <div className={styles.leftRow}>
          <div className={styles.leftIcon}>
            <SimpleNight />
          </div>
          <span className={styles.leftText}>Others You May Like</span>
        </div>
        <Button>View More</Button>
      </div>
      <Row gutter={24}>
        <Col md={8} xs={24}>
          <Card
            Icon={Restaurant}
            img="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
            rate={3}
            title="Palm Restaurant"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec orci enim, luctus vel nisl Bibendum."
            price={`${currency?.symbol}19.99`}
          />
        </Col>
        <Col md={8} xs={24}>
          <Card
            Icon={Restaurant}
            img="https://images.unsplash.com/photo-1540541338287-41700207dee6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
            rate={4}
            title="Awesome Beach"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec orci enim, luctus vel nisl Bibendum."
            price={`${currency?.symbol}39.99`}
          />
        </Col>
        <Col md={8} xs={24}>
          <Card
            Icon={Restaurant}
            img="https://images.unsplash.com/photo-1445019980597-93fa8acb246c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1353&q=80"
            rate={5}
            title="Moutain Hotel"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec orci enim, luctus vel nisl Bibendum."
            price={`${currency?.symbol}199.99`}
          />
        </Col>
      </Row>
    </div>
  );
}
