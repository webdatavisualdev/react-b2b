import React from "react";
import styles from "./CategoriesMenu.module.scss";

const CategoriesMenu = () => (
  <div className={styles.categoriesMenu}>
    <span>Categories</span>
    <ul className={styles.list}>
      <li>Category 1</li>
      <li>Category 2</li>
      <li>Category 3</li>
    </ul>
  </div>
);

export default CategoriesMenu;
