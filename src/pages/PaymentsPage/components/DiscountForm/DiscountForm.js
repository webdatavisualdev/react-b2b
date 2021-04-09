import React, { useState } from "react";
import { Form, Input } from "antd";
import cx from "classnames";
import FormItem from "components/FormItem/FormItem";
import Button from "components/Button/Button";
import { ReactComponent as CloseIcon } from "icons/close-fill.svg";
import styles from "./DiscountForm.module.scss";

function DiscountItem({ data, total = 0, onRemove }) {
  return (
    <div className={styles.item}>
      <div>
        <span className="fa fa-plus" />
        {data.value}% OFF
      </div>
      <div>
        -${((total * data.value) / 100).toFixed(2)}
        <CloseIcon width={14} height={14} onClick={onRemove} />
      </div>
    </div>
  );
}

export default function DiscountForm({ className, totalAmount }) {
  const [items, setItems] = useState([]);

  const handleRemove = (index) => () => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  return (
    <div className={cx(styles.root, className)}>
      <div className={styles.title}>Discount/Voucher Code</div>
      <Form>
        <FormItem size="large">
          <Input placeholder="Enter code..." />
        </FormItem>
        <FormItem>
          <Button variant="secondary" fullWidth>
            Apply Code
          </Button>
        </FormItem>
      </Form>
      <div>
        {items.map((item, i) => (
          <DiscountItem
            key={`discountItem_${i}`}
            data={item}
            total={totalAmount}
            onRemove={handleRemove(i)}
          />
        ))}
      </div>
    </div>
  );
}
