import React from 'react';
import { Steps as DefaultSteps } from 'antd';
import cx from 'classnames';
import styles from './Steps.module.scss';

const { Step: DefaultStep } = DefaultSteps;

const Steps = ({ className, children, ...others }) => (
  <DefaultSteps className={cx(styles.root, className)} {...others}>
    {children}
  </DefaultSteps>
);

const Step = ({ className, ...others }) => (
  <DefaultStep
    className={cx(styles.step, className)}
    {...others}
  />
);

export {
  Steps,
  Step,
};
