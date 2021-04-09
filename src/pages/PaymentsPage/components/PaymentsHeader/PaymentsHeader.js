import React from 'react';
import { Steps, Step } from 'components/Steps/Steps';
import './PaymentsHeader.scss';

const PaymentsHeader = () => {
  return (
    <div className="payment-header-root">
      <span>Payment Information</span>
      <Steps className="steps" current={1} labelPlacement="vertical">
        <Step title="Guests" className="step-1" />
        <Step title="Payment" className="step-2" />
      </Steps>
    </div>
  );
}

export default PaymentsHeader;
