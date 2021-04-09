import React, { useState, useCallback } from "react";
import { AutoComplete } from "antd";
import { useDispatch } from "react-redux";
import { debounce } from "lodash";
import hotelActions from "../../store/hotel/actions";
import styles from './AutoComplete.module.scss';
import pin from "icons/pin.png";
const getLocationText = (value) =>
  `${value.location_name}${
    value.province !== undefined && !Number(value.province)
      ? `, ${value.province}`
      : ""
  }, ${value.iso_country_code}`;

const Complete = ({ onSelect, value, clearData, styles: inputStyle = {} }) => {
  const [text, setText] = useState('');
  const [locationData, setLocationData] = useState([]);
  const dispatch = useDispatch();

  const callAPI = (payload) => {
    dispatch(hotelActions.getLocationData(payload)).then((res) => {
      setLocationData(res);
    });
  };

  const debounceLoadData = useCallback(debounce(callAPI, 1000), []);

  const onCompleteChange = (data) => {
    clearData();
    setText(data);
    debounceLoadData(data);
  };

  const onSelected = (id) => {
    const selectedValue = locationData.find((l) => l.location_id === id);
    onSelect(selectedValue);
  };

  return (
    <AutoComplete
      options={locationData.map((r) => ({
        value: r.location_id,
        label: getLocationText(r),
      }))}
      value={value?.location_name ? getLocationText(value) : text}
      className={styles.autocomplete}
      style={{ ...inputStyle }}
      onChange={onCompleteChange}
      placeholder="location"
      onSelect={onSelected}
    />
  );
};

export default Complete;
