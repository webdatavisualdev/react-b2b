import React from "react";
import cx from "classnames";
import { useSelector } from "react-redux";
import { Tabs, TabPane } from "components/Tab/Tab";
import GoogleMap from "components/GoogleMap/GoogleMap";
import DetailItem from "../DetailItem/DetailItem";
import DetailHeader from "../DetailHeader/DetailHeader";
import { getCurrency } from "store/core/selectors";
import styles from "./RoomListSection.module.scss";

export default function RoomListSection(props) {
  const { className, hotel, nights, selectedRooms, onRoomItemClick } = props;
  const location = {
    lat: hotel.hotel_details.geolocation.latitude,
    lng: hotel.hotel_details.geolocation.longitude,
  };
  const currency = useSelector(getCurrency);

  return (
    <div className={cx(styles.root, className)}>
      <DetailHeader
        className={styles.detailHeader}
        details={hotel.hotel_details}
        headerOnly
      />
      <Tabs className={styles.tabPane} defaultActiveKey="1">
        <TabPane tab="Rooms" key="1">
          {hotel.room_types.map((item, i) => (
            <DetailItem
              key={item.code}
              data={item}
              nights={nights}
              selected={selectedRooms.includes(item.code)}
              onSelect={onRoomItemClick(item.code)}
              onDeselect={onRoomItemClick(item.code, true)}
              occupancy={hotel.occupancy}
              currency={currency}
            />
          ))}
        </TabPane>
        <TabPane tab="Details" key="2">
          <div className={styles.amenities}>
            <p className={styles.detailsTab}>
              {hotel.hotel_details.property_description}
            </p>
            <h5 className={styles.amenitiesWrapper}>Amenities</h5>
            <ul>
              {hotel.hotel_details.amenities.map((amenity) => {
                return <li>{amenity}</li>;
              })}
            </ul>
          </div>
        </TabPane>
        <TabPane tab="Map" key="3">
          <div>
            <GoogleMap center={location} coords={[location]} />
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
}
