import React, { useState, useRef, Fragment } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import classnames from "classnames";
import { FormattedMessage } from "react-intl";
import hotelActions from "store/hotel/actions";
import { getTopFilters } from "store/hotel/selectors";
import EditPanel from "./EditPanel";
import bed from "icons/bed.svg";
import dad from "icons/Adult.svg";
import kid from "icons/Child.svg";
import pin from "icons/pin.png";
import cal from "icons/calendar.png";
import styles from "./TopFilters.module.scss";

const initialState = {
  location: {
    location_id: "5128581",
    location_name: "New York City",
    iso_country_code: "USA",
  },
  start_date: moment().add(1, "day").format("YYYY-MM-DD"),
  end_date: moment().add(2, "day").format("YYYY-MM-DD"),
  occupancy: {
    adults: 2,
    children: 0,
  },
  nights: 1,
  language: "en",
  currency: "USD",
};

const TopFilters = ({ currency }) => {
  const topFilters = useSelector(getTopFilters);
  const [isEdit, toggleEdit] = useState(false);
  const [data, setData] = useState({ ...initialState, ...topFilters });
  const dispatch = useDispatch();
  const locCache = useRef(initialState.location);

  const onDateChange = (name) => (e) =>{
    if (name === 'start_date' && moment(data.end_date).diff(e._d, 'day') <= 0) {
      setData({
        ...data,
        end_date: moment(e._d).add(1, 'day').format("YYYY-MM-DD"),
        start_date: moment(e._d).format("YYYY-MM-DD"),
      });
    } else {
      setData({
        ...data,
        [name]: moment(e._d).format("YYYY-MM-DD"),
      });
    }
  };

  const onChange = (name) => (value) => {
    if ( name === "nights" && value !== -1) {
      setData({ ...data, nights: value });
    }
    else if ( value !== -1 ) {
      setData({ ...data, occupancy: { ...data.occupancy, [name]: value } });
    }
  };

  const onSelect = (location) => {
    setData({ ...data, location });
  };

  const clearData = () => {
    if (data.location?.location_id) {
      locCache.current = data.location || initialState.location;
    }
    setData({ ...data, location: {} });
  };

  const onCurrencyChange = (_currency) => {
    setData({ ...data, currency: _currency });
    searchHotels(_currency);
  };

  const searchHotels = (_currency) => {
    const payload = {
      location_id: data.location.location_id,
      start_date: data.start_date,
      end_date: data.end_date,
      occupancy: {
        adults: data.occupancy.adults,
        children: data.occupancy.children,
      },
      language: "en",
      currency: _currency.bubbles?data.currency:_currency
    };
    dispatch(hotelActions.searchHotels(payload));
    dispatch(hotelActions.topFilterData(payload));
    toggleEdit(false);
  };

  return (
    <Fragment>
      <div className={styles.topFilter}>
      {isEdit ? (
        <EditPanel
          currency={currency}
          onCurrencyChange={onCurrencyChange}
          clearData={clearData}
          onSelect={onSelect}
          onChange={onChange}
          onDateChange={onDateChange}
          data={data}
          searchHotels={searchHotels}
          toggleEdit={toggleEdit}
        />
      ) : (
        <div className={styles.display}>
          <div className={styles.display}>
            <div className={styles.displayDate}>
              <div className={styles.wrapper}>
                <img src={cal} alt="" className={styles.img} />
                <div className={styles.item}>
                  {moment(data.start_date).format("MM/DD/YYYY")} {"-"}
                  {moment(data.end_date).format("MM/DD/YYYY")}
                </div>
              </div>
              <div className={styles.wrapper}>
                <img src={pin} alt="" className={styles.img} />
                <div className={styles.item}>
                  {data.location.location_name} {data.location.iso_country_code ? `, ${data.location.iso_country_code}` : ''}
                </div>
              </div>
            </div>
            <div className={styles.displayCount}>
              <div style={{display: 'flex'}}>
                <div className={styles.wrapper}>
                  <img src={dad} alt="" className={styles.img} />
                  <div className={classnames(styles.item, styles.padding5)}>
                    {data.occupancy.adults}
                  </div>
                </div>
                <div className={styles.wrapper}>
                  <img src={kid} alt="" className={styles.img} />
                  <div className={classnames(styles.item, styles.padding5)}>
                    {data.occupancy.children}
                  </div>
                </div>
                <div className={styles.wrapper}>
                  <img src={bed} alt="" className={styles.img} />
                  <div className={classnames(styles.item, styles.padding5)}>
                    {data.nights || 1}
                  </div>

                </div>

              </div>
              <div className={styles.buttonWrapper}>
                <button onClick={() => toggleEdit(true)} className={styles.btn}>
                  <FormattedMessage id="edit" defaultMessage="Edit" />
                </button>
              </div>
            </div>

          </div>

        </div>
      )}
    </div>
    </Fragment>
  );
};
export default TopFilters;
