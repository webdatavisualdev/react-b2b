import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Drawer } from "antd";
import { getDrawerOpen } from "store/core/selectors";
import coreActions from "store/core/actions";
import styles from "./Drawer.module.scss";

const CustomDrawer = ({
  header,
  footer,
  children,
  placement,
  closable,
  onClose,
  className,
}) => {
  const drawerOpen = useSelector(getDrawerOpen);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(coreActions.toggleDrawerOpen());
    if (onClose) {
      onClose();
    }
  };

  return (
    <Drawer
      className={`${styles.root} ${className || ''}`}
      placement={placement}
      closable={closable}
      onClose={handleClose}
      visible={drawerOpen}
      headerStyle={{
        height: 100,
        padding: '26px 20px 26px 20px',
        backgroundColor: '#f4f4f4',
        borderBottom: 'solid 1px #c6c6c6'
      }}
      footer={footer}
      footerStyle={{
        height: 100,
        padding: '26px 20px 26px 20px',
        backgroundColor: '#f4f4f4',
        borderTop: 'solid 1px #c6c6c6',
        padding: 0,
      }}
      width="315px"
    >
      <div className={styles.header}>{header}</div>
      <div className={styles.body}>{children}</div>
    </Drawer>
  );
};

export default CustomDrawer;
