import React from "react";
import { Radio } from 'antd';

import styles from "./CategoryFilter.module.scss";

const CategoryFilter = (props) => {
  return (
    <div className={styles.container}>
      <Radio.Group
        defaultValue="accommodations"
        buttonStyle="solid"
        className={styles.radio}
        onChange={props.onChange}
      >
        <Radio.Button value="all">
          <span className={styles.optionLabel}>Show All</span>
        </Radio.Button>
        <Radio.Button value="accommodation">
          <span className={styles.optionLabel}>Accommodation</span>
        </Radio.Button>
        <Radio.Button value="transportation">
          <span className={styles.optionLabel}>Transportation</span>
        </Radio.Button>
        <Radio.Button value="tours_activities">
          <span className={styles.optionLabel}>Tours & Activities</span>
        </Radio.Button>
        <Radio.Button value="shows_events">
          <span className={styles.optionLabel}>Shows & Events</span>
        </Radio.Button>
        <Radio.Button value="dining">
          <span className={styles.optionLabel}>Dining</span>
        </Radio.Button>
        <Radio.Button value="nightlife">
          <span className={styles.optionLabel}>Nightlife</span>
        </Radio.Button>
      </Radio.Group>
    </div>
  );
};

export default CategoryFilter;
