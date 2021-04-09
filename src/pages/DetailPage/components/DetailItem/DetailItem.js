import React from "react";
import cx from "classnames";
import { get } from "lodash";
import { ReactComponent as InfoIcon } from "icons/info.svg";
import { FormattedMessage } from "react-intl";
import { Button, Popover, Tooltip } from "antd";
import Divider from "components/Divider/Divider";
import { commaFormat } from "../../../../utils/helperMethods";
import styles from "./DetailItem.module.scss";
import { Currencies } from "helpers/constants";

const PopOverContent = (currencySymbol, data) => {
  return (
    <div>
      <p>
        <FormattedMessage
          id="detailPage.info.rate"
          values={{ rate: ` ${currencySymbol}${commaFormat(data?.total_base_rate?.amount)}` }}
        />
      </p>
      <p>
        <FormattedMessage
          id="detailPage.info.taxes"
          values={{ taxes: ` ${currencySymbol}${commaFormat(data.total_tax_rate.amount)}` }}
        />
      </p>
      <p>
        <FormattedMessage
          id="detailPage.info.total"
          values={{ total: ` ${currencySymbol}${commaFormat(data.total.amount)}` }}
        />
      </p>
      <p>
        <FormattedMessage
          id="detailPage.info.postPaidFees"
          values={{ total: ` ${currencySymbol}${commaFormat(data?.postpaid_fees?.total?.amount || 0)}` }}
        />
      </p>
    </div>
  );
};

const DetailItem = (props) => {
  const { data, nights, selected, currency, onSelect } = props;

  const totalCost =
    data.total && data.total.amount > 0
      ? commaFormat(Number(data.total.amount).toFixed(2))
      : 0;
  const nightCost = data.avg_nightly_rate
    ? commaFormat(Number(data.avg_nightly_rate.amount).toFixed(2))
    : 0;
  const currencySymbol = Currencies[data?.avg_nightly_rate?.currency || 'USD']?.symbol
  return (
    <div
      className={cx(styles.root, {
        [styles.active]: selected,
      })}
    >
      <div className={styles.detail}>
        <div className={styles.header}>
          <span>{data.name}</span>
        </div>
        <div className={styles.price}>
          <span className={styles.main}>
            {currencySymbol}
            {commaFormat(Number(nightCost.replace(',', '') * 1).toFixed(2))}
          </span>
          <div className={styles.night}>
            {currencySymbol}
            {totalCost}
            <span>
              {nights > 1 ? (
                <FormattedMessage id="detailItem.costs" values={{ nights }} />
              ) : (
                <FormattedMessage id="detailItem.cost" values={{ nights }} />
              )}
            </span>
          </div>
        </div>
        <div className={styles.flexWrapper}>
          <div className={styles.learnMore}>
            <Popover content={PopOverContent(currencySymbol, data)}>
              <InfoIcon />
            </Popover>
            <FormattedMessage id="learnMore" />
          </div>
          {get(data, "cancellation_policy.summary") && (
            <div className={styles.cancellation}>
              <Tooltip
                color="white"
                placement="top"
                title={
                  <div className={styles.cnlTooltip}>
                    <span>Cancellation Deadline</span>:{" "}
                    {get(data, "cancellation_policy.cancellation_deadline")}
                    <br />
                    <span>Policy</span>:{" "}
                    {get(data, "cancellation_policy.unstructured_policy")}
                  </div>
                }
              >
                <span className={styles.cnlText}>
                  {get(data, "cancellation_policy.summary").replace("_", " ")}
                </span>
              </Tooltip>
            </div>
          )}
        </div>
        <Divider />
        <div className={styles.category}></div>

        <div className={styles.bottom}>
          <div className={styles.roomCount} onClick={onSelect}>
            <Button type="primary">
              <FormattedMessage id="select" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailItem;
