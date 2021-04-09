import React from 'react';
import { Input } from 'antd';
import cx from 'classnames';
import styles from './RightIconInput.module.scss';

const NumberInput = ({ value, className, name, onChange, rightComponent  }) => {
  return (
    <Input.Group compact className={cx(styles.root, className)}>
      <Input placeholder={name} name={name} value={value} onChange={e => onChange(e.target.value)} />
      <div className={styles.right}>
        {rightComponent}
      </div>
    </Input.Group>
  );
}

export default NumberInput;