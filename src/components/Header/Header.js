import React from "react";
import {useDispatch, useSelector} from "react-redux";
import { MenuOutlined } from "@ant-design/icons";
import coreActions from 'store/core/actions';
import { getSelectedRoomItems } from "../../store/booking/selectors";
import logo from '../../images/simplenight-logo.png';
import CartIcon from "../../icons/cart.svg";
import styles from "./Header.module.scss";

const Header = () => {
  const dispatch = useDispatch();
  const selectedRooms = useSelector(getSelectedRoomItems);

  const handleMenuButtonClick = () => {
    dispatch(coreActions.toggleDrawerOpen());
  }

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <MenuOutlined className={styles.menubtn} onClick={handleMenuButtonClick} />
        <div className={styles.logo}>
          <img className={styles.logoImage} src={logo} alt="logo" />
        </div>
        <div className={styles.cartWrapper} onClick={() => dispatch(coreActions.toggleDrawer(true))}>
          <p>{selectedRooms.length}</p>
          <img src={CartIcon} alt="" />
        </div>
      </div>
    </header>
  );
};

export default Header;
