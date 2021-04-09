import React from 'react';
import { Drawer } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { getSelectedRoomItems } from "../../store/booking/selectors";
import { getDrawerStatus } from "../../store/core/selectors";
import ItineraryDetail from "../../pages/PaymentsPage/components/ItineraryDetail/ItineraryDetail";
import coreActions from "../../store/core/actions";
import styles from './CartDrawer.module.scss';

const CartDrawer = () => {
	const dispatch = useDispatch();

	const selectedRooms = useSelector(getSelectedRoomItems);
	const showDrawer = useSelector(getDrawerStatus)

	const onClose = () => dispatch(coreActions.showCartDrawer(false));

	return (
		<Drawer className={styles.cartDrawer} visible={showDrawer} onClose={onClose}>
			<ItineraryDetail items={selectedRooms} drawerChild />
		</Drawer>
	)
};

export default CartDrawer;
