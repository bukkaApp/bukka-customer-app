import React from 'react';

import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Price from '../badge/Price';
import Times from '../icons/Times';
import Button from '../button/Button';

import './cartIconSection.scss';
import { useCartContext } from '../../context/CartContext';

export const SubTotal = () => (
  <div className="custom-cart-subtotal">
    <p className="m-0">
      <span>Subtotal</span>
    </p>
    <p className="m-0 text-color">
      <span>₦{useCartContext().totalCost()}.00</span>
    </p>
  </div>
);

export const CheckoutBtn = ({ handleClick, bukka }) => (
  <Link to={`/merchant/${bukka}/checkout`}>
    <Button
      handleClick={handleClick}
      type="button"
      classNames="cart-checkout-btn"
    >
      <span className="cart-checkout-btn-text">
        <span>Checkout</span>
      </span>
    </Button>
  </Link>
);

const CartHeader = () => (
  <div className="custom-cart-header">
    <div className="cart-header-content">
      <h2 className="cart-header-h2">
        <span>Items</span>
      </h2>
    </div>
  </div>
);

export const CartItems = ({
  title,
  category,
  price,
  quantity,
  delProduct
}) => (
  <div className="cart-body-content">
    <div className="custom-cart-section">
      <div className="custom-cart-item">
        <div className="custom-item-number">{quantity}x</div>
        <div className="custom-cart-list">
          <div className="custom-cart-item-name">{title}</div>
          <div className="custom-cart-item-category">{category}</div>
        </div>
        <Price price={price} />
      </div>
      <span
        onClick={delProduct}
        tabIndex={0}
        role="button"
        className="cart-cancel-icon"
      >
        <Times />
      </span>
    </div>
  </div>
);

const CartSection = ({
  focus,
  handleClick,
}) => {
  const { cart, delProduct, totalCost } = useCartContext();
  const handleCheckoutMode = () => {
    handleClick(true);
  };

  const handleCategoryText = (item) => {
    let result = '';
    if (item.submenus.length > 0) {
      item.submenus.map((subMenu) => subMenu.options.map((option) => result += ` ${option.name},`));
    }
    const slicedResult = result.slice(0, 21);
    return slicedResult.slice(0, slicedResult.length - 1);
  };

  const handleEachCost = (item) => {
    let total = 0;
    if (item.submenus.length > 0) {
      item.submenus.map((subMenu) => subMenu.options.map((option) => total += option.price));
    }
    return total;
  };

  if (!focus || (focus && cart.length <= 0)) {
    return null;
  }

  return (
    <div className={`cart-container ${cart.length <= 0 ? 'd-none' : ''}`}>
      <div>
        <CartHeader />
        <div
          className={`custom-cart-body ${
            cart.length > 2 ? 'cart-body-height' : ''
          }`}
        >
          {cart.map((item, index) => (
            <CartItems
              key={item.title}
              title={item.title}
              delProduct={() => delProduct({ slug: item.slug, index })}
              category={handleCategoryText(item) || item.category}
              price={(handleEachCost(item) + item.price) * item.quantity}
              quantity={item.quantity}
            />
          ))}
        </div>
        <SubTotal totalPriceInCart={totalCost} />
        <CheckoutBtn
          handleClick={handleCheckoutMode}
          bukka={cart[0].bukka}
        />
      </div>
    </div>
  );
};

export default CartSection;

CheckoutBtn.propTypes = {
  handleClick: PropTypes.func.isRequired
};

CartSection.propTypes = {
  handleClick: PropTypes.func.isRequired,
  focus: PropTypes.bool.isRequired,
};

SubTotal.propTypes = {};

CartItems.defaultProps = {
  title: '',
  category: '',
  price: ''
};

CartItems.propTypes = {
  removeFromCartAction: PropTypes.func.isRequired,
  title: PropTypes.string,
  category: PropTypes.string,
  price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  quantity: PropTypes.number.isRequired
};
