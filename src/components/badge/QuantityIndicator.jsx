import React from 'react';

import './quantityIndicator.scss';
import { useCartContext } from '../../context/CartContext';

const QuantityIndicator = () => (
  <div className="quantity-badge">{useCartContext().cart.length || 0}</div>
);

export default QuantityIndicator;

QuantityIndicator.propTypes = {};
