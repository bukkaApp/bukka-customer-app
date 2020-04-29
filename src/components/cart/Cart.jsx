import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';
import CartIcon from '../icons/Cart';
import {
  CartItems,
  CheckoutBtn,
  SubTotal
} from './CartSection';

import './emptycart.scss';
import { useCartContext } from '../../context/CartContext';

export const CartDropdown = ({ children, display }) =>
  display && (
    <div className="cart-dropdown-menu" aria-labelledby="dropdownMenuButton">
      {children}
    </div>
  );

const Cart = () => {
  const [businessName, setBusinessName] = useState('');
  const { delProduct, cart, totalCost } = useCartContext();

  useEffect(() => {
    const name = cart.length > 0 ? cart[0].bukka : '';
    setBusinessName(name);
  }, [cart])

  if (cart.length) {
    return (
      <div className="empty-cart-container">
        <div className="px-4 pt-2">
          <div className="cart-bukka-details">
            <h5 className="cart-bukka-name font-size-15">
              {businessName.split('-').slice(0, -1).join(' ')}</h5>
            <h5 className="cart-bukka-view-menu">
              <Link
                className="text-success view-menu-text"
                to={`/bukka/${cart[0].bukka}`}
              >
                VIEW MENU
              </Link>
            </h5>
          </div>
        </div>
        <div
          className={`custom-cart-body ${
            cart.length > 2 ? 'cart-body-height' : ''
          }`}
        >
          {cart.map((item, index) => (
            <CartItems
              key={`${item.price}-${item.title}`}
              title={item.title}
              removeFromCartAction={() => delProduct({ slug: item.slug, index })}
              category={item.category}
              price={item.price}
              quantity={item.quantity}
            />
          ))}
        </div>
        <SubTotal totalPriceInCart={totalCost} />
        <CheckoutBtn handleClick={() => {}} bukka={cart[0].bukka} />
      </div>
    );
  }

  return (
    <div className="empty-cart-container">
      <div>
        <div className="empty-cart-section">
          <div className="d-flex">
            <div className="position-relative">
              <CartIcon />
              <div className="empty-cart-icon">0</div>
            </div>
            <div className="empty-cart-text">
              <div>
                <span>Your cart is empty.</span>
              </div>
              <div>
                <span>Add items to get started.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
