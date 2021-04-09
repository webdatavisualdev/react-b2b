import React, { Fragment } from "react";
import { DatePicker, Input, Button, Modal } from "antd";
import moment from "moment";
import { get } from "lodash";
import classNames from "classnames";
import { FormattedMessage } from "react-intl";
import Complete from "../AutoComlete/AutoComplete";
import Select from "../Select/Select";
import { Currencies } from "../../helpers/constants";
import NumberInput from "../NumberInput/NumberInput";

import pin from "icons/pin.png";
import { ReactComponent as AdultIcon } from "icons/Adult.svg";
import { ReactComponent as ChildIcon } from "icons/Child.svg";
import { ReactComponent as CalendarIcon } from "icons/calendar.svg";
import { ReactComponent as MinusIcon } from "icons/minus.svg";
import { ReactComponent as PlusIcon } from "icons/plus.svg";
import { ReactComponent as BedIcon } from "icons/bed.svg";
import { ReactComponent as CloseIcon } from "icons/close-fill.svg";

import styles from "./TopFilters.module.scss";
import "./editPanel.scss";

const currencyOptions = Object.keys(Currencies).map((value) => ({
  title: `${value} (${Currencies[value].symbol})`,
  value,
}));

const EditPanelBody = ({ currency, onCurrencyChange, clearData, onSelect, onChange, onDateChange, data, searchHotels, toggleEdit }) => {
  return (
    <div className="editPanel">
      <div className={classNames('itemWrapper', 'autoCompleteWrapper')}>
        <Complete
          value={data.location}
          onSelect={onSelect}
          clearData={clearData}
        />
        <img src={pin} alt="" className={styles.img} />
      </div>
      <div className={classNames('itemWrapper', 'date-picker')}>
        <div className="dateWrapper">
          <DatePicker
            onChange={(e) => onDateChange('start_date')(e)}
            defaultValue={moment(data.start_date)}
            value={moment(data.start_date)}
            suffixIcon={<CalendarIcon className="calendarIcon" />}
          />
        </div>
        <div className="minus" />
        <div className="dateWrapper">
          <DatePicker
            onChange={(e) => onDateChange('end_date')(e)}
            defaultValue={moment(data.end_date)}
            value={moment(data.end_date)}
            suffixIcon={<CalendarIcon className="calendarIcon" />}
          />
        </div>
      </div>
      <div className={classNames('itemWrapper', 'countWrapper')}>
        <div className="icon">
          <AdultIcon width="25" />
          <span className="text">
            <FormattedMessage id="adults" />
          </span>
        </div>
        <div className="countInputWrapper">
          <Input className="countInput" value={data.occupancy.adults} />
          <NumberInput className="customNumberInput" name={'adults'} onChange={onChange} defaultValue={2} />
          <div className="iconsWrapper">
            <PlusIcon onClick={() => onChange('adults')( data.occupancy.adults + 1)} />
            <MinusIcon onClick={() => onChange('adults')( data.occupancy.adults - 1)} />
          </div>
        </div>
      </div>
      <div className={classNames('itemWrapper', 'countWrapper')}>
        <div className="icon">
          <ChildIcon width="25" />
          <span className="text">
            <FormattedMessage id="children" />
          </span>
        </div>
        <div className="countInputWrapper">
          <Input className="countInput" value={data.occupancy.children} />
          <NumberInput className="customNumberInput" name={'children'} defaultValue={0} onChange={onChange} />
          <div className="iconsWrapper">
            <PlusIcon onClick={() => onChange('children')( data.occupancy.children + 1)} />
            <MinusIcon onClick={() => onChange('children')( data.occupancy.children - 1)} />
          </div>
        </div>
      </div>
      <div className={classNames('itemWrapper', 'countWrapper')}>
        <div className="icon">
          <BedIcon width="25" />
          <span className={'text'}>Rooms</span>
        </div>
        <div className="countInputWrapper">
          <Input className="countInput" value={data.nights} />
          <NumberInput className="customNumberInput" name={'nights'} defaultValue={1} onChange={onChange} />
          <div className="iconsWrapper">
            <PlusIcon onClick={() => onChange('nights')( data.nights + 1)} />
            <MinusIcon onClick={() => onChange('nights')( data.nights - 1)} />
          </div>
        </div>
      </div>
      <div className={classNames('itemWrapper', 'currency')}>
        <Select
          options={currencyOptions}
          value={get(currency, "value")}
          onChange={onCurrencyChange}
        />
      </div>
      <div className="footer-wrapper">
        <EditPanelFooter toggleEdit={toggleEdit} searchHotels={searchHotels} />
      </div>
    </div>
  )
};

const EditPanelFooter = ({ toggleEdit, searchHotels }) => {
  return (
    <div className={classNames('itemWrapper', 'footer')}>
      <div className="cancel">
        <Button onClick={() => toggleEdit(false)} >
          <FormattedMessage id="cancel" />
        </Button>
      </div>
      <div className="search">
        <Button onClick={searchHotels} >
          <FormattedMessage id="search" />
        </Button>
      </div>
      <div className="closeIcon">
        <CloseIcon onClick={() => toggleEdit(false)} />
      </div>
    </div>
  )
};

const EditPanel = ({ ...props }) => {
  return (
    <Fragment>
      <div className="editPanelWrapper">
        <EditPanelBody {...props} />
      </div>
      <Modal
        maskClosable
        visible
        title="Edit Your Preferences"
        onCancel={() => props.toggleEdit(false)}
        className="editPanelResponsive"
        footer={<EditPanelFooter {...props} />}
      >
        <EditPanelBody {...props} />
      </Modal>
    </Fragment>
  )
};

export default EditPanel;
