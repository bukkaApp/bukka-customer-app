import React from 'react';

import PropTypes from 'prop-types';
import QuantityIndicator from '../badge/QuantityIndicator';
import Cart from '../icons/Cart';

const CartIndicator = ({ handleClick }) => (
  <div
    onClick={handleClick}
    tabIndex="0"
    aria-pressed="false"
    role="button"
    className="cart-section"
  >
    <Cart />
    <QuantityIndicator />
  </div>
);

export default CartIndicator;

CartIndicator.propTypes = {
  handleClick: PropTypes.func.isRequired,
};
