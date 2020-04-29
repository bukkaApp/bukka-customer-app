import React from 'react';

import PropTypes from 'prop-types';

import './deliveryorpickupnav.scss';
import { useDeliveryPickupModeContext } from '../../context/DeliveryPickupContext';

const DeliveryOrPickupNav = ({ delivery }) => {
  const { setDeliveryPickupMode, mode } = useDeliveryPickupModeContext();
  return (
    <div className="btn-group" role="group">
      <button
        type="button"
        className={`btn-delivery ${
          mode === 'delivery' ? 'delivery-mode-active' : ''
        }`}
        onClick={() => setDeliveryPickupMode('delivery')}
      >
        delivery
      </button>
      {!delivery &&
      <button
        type="button"
        className={`btn-pickup ${
          mode === 'pickup' ? 'delivery-mode-active' : ''
        }`}
        onClick={() => setDeliveryPickupMode('pickup')}
      >
        pickup
      </button>
      }
    </div>
  );  
}

export default DeliveryOrPickupNav;

DeliveryOrPickupNav.defaultProps = {
  delivery: false
};

DeliveryOrPickupNav.propTypes = {
  delivery: PropTypes.bool,
};
