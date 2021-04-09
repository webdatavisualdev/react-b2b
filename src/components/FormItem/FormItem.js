import React from "react";
import { Form, Input } from "antd";
import cx from "classnames";
import styles from "./FormItem.module.scss";

const FormItem = ({
  children,
  noForm,
  className,
  required,
  size,
  ...other
}) => {
  return (
    <div
      className={cx(styles.root, className, {
        [styles[size]]: true,
      })}
    >
      {!noForm && (
        <Form.Item rules={[{ required: !!required, message: " " }]} {...other}>
          {children}
        </Form.Item>
      )}
      {noForm && (
        <div className={styles.noForm}>
          <Form.Item {...other}>
            <Input value="1" />
          </Form.Item>
          {children}
        </div>
      )}
      {required && (
        <span className={styles.required}>
          {typeof required === "string" ? required : "Required"}
        </span>
      )}
    </div>
  );
};

export default FormItem;
