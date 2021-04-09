import React from 'react';
import GoogleMapReact from 'google-map-react';
import cx from 'classnames';
import styles from './GoogleMap.module.scss';

const MarkerComponent = (props) => (
  <div className={styles.marker}>
    <i className="fa fa-map-marker" aria-hidden="true"></i>
  </div>
);

const GoogleMap = (props) => {
  const { center, coords, className } = props;
  return (
    <div className={cx(styles.mapContainer, className)} style={{height: props.height}}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: window.REACT_APP_GOOGLE_MAP_KEY }}
        defaultCenter={center}
        defaultZoom={12}
      >
        {coords.map((coord, i) => {
          return (
            <MarkerComponent
              lat={coord.latitude}
              lng={coord.longitude}
              key={`${coord.latitude}${coord.longitude}_${i}`}
            />
          )
        })
        }
      </GoogleMapReact>
    </div>
  )
};

export default GoogleMap;
