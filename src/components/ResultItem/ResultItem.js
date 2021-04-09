import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { FormattedMessage } from "react-intl";
import { push } from "connected-react-router";
import { Popover } from "antd";
import Rating from "../Rating/Rating";
import Button from "../Button/Button";
import IconButton from "../IconButton/IconButton";
import { ReactComponent as PinIcon } from "icons/pin.svg";
import { ReactComponent as BedIcon } from "icons/bed3.svg";
import { ReactComponent as InfoIcon } from "icons/info.svg";
import GoogleMap from "components/GoogleMap/GoogleMap";
import hotelActions from "store/hotel/actions";
import { commaFormat } from "../../utils/helperMethods";
import styles from "./ResultItem.module.scss";

const ResultItem = ({ hotel, currency }) => {
  const [mapOpened, openMap] = useState(false);
  const dispatch = useDispatch();

  const toggleMap = () => {
    openMap(!mapOpened);
  };

  const onViewClick = () => {
    dispatch(hotelActions.selectHotel(hotel));
    dispatch(push(`${window.BASE_ROUTE || ""}/hotels/${hotel.hotel_id}`));
  };

  const taxesFees = (
    <div>
      <p>
        <FormattedMessage
          id="searchPage.filters.resultList.resultItem.rate"
          values={{ rate: commaFormat(hotel.avg_nightly_rate.toFixed(currency?.decimal)) }}
        />
      </p>
      <p>
        <FormattedMessage
          id="searchPage.filters.resultList.resultItem.base"
          values={{ base: commaFormat(hotel.avg_nightly_base.toFixed(currency?.decimal)) }}
        />
      </p>
      <p>
        <FormattedMessage
          id="searchPage.filters.resultList.resultItem.tax"
          values={{ tax: commaFormat(hotel.avg_nightly_tax.toFixed(currency?.decimal)) }}
        />
      </p>
    </div>
  );

  return (
    <div className={styles.resultContainer}>
      <div className={styles.resultItem}>
        <div className={styles.mainImage}>
          <img src={hotel.hotel_details.thumbnail_url} alt="Result Item" />
        </div>

        <div className={styles.right}>
          <div className={styles.circle}>
            <BedIcon />
          </div>
          <div className={styles.content}>
            <div className={styles.line}>
              <h3 className={styles.itemName}>{hotel.hotel_details.name}</h3>
              <div className={styles.rateInfo}>
                <div className="flex-vertical-center">
                  <span>
                    <FormattedMessage id="average" defaultMessage="AVERAGE" />
                  </span>
                  <span className={styles.itemRate}>
                    {currency?.symbol + commaFormat(hotel.avg_nightly_rate.toFixed(currency?.decimal))}
                  </span>
                </div>
                <div className={`${styles.taxesAndFees} flex-vertical-center`}>
                  <Popover content={taxesFees}>
                    <InfoIcon className={styles.infoIcon} />
                  </Popover>
                  <span>
                    <FormattedMessage
                      id="taxesAndFees"
                      defaultMessage="Taxes and Fees"
                    />
                  </span>
                </div>
              </div>
            </div>

            <div>
              <Rating
                scoreonly
                score={hotel.hotel_details.star_rating}
                className={styles.rating}
              />
            </div>
            <div className={`${styles.line} ${styles.baseline}`}>
              <span className={styles.description}>
                {hotel.hotel_details.property_description}
              </span>
              <div className={styles.actions}>
                <IconButton Icon={PinIcon} onClick={toggleMap} />
                <Button onClick={onViewClick}>
                  <FormattedMessage id="view" defaultMessage="View" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {mapOpened && (
        <GoogleMap
          height={300}
          center={[
            hotel.hotel_details.geolocation.latitude,
            hotel.hotel_details.geolocation.longitude,
          ]}
          coords={[hotel.hotel_details.geolocation]}
        />
      )}
    </div>
  );
};

export default ResultItem;
