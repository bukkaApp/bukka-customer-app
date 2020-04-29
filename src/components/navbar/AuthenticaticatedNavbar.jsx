import React, { Fragment, useState } from 'react';

import Brand from '../brand/Brand';
import CartIndicator from '../cart/CartIndicator';
import Cart, { CartDropdown } from '../cart/Cart';
import CartSection from '../cart/CartSection';
import UserDefaultImage from './common/UserDefaultImage';

import './navbar.scss';
import useClickOutside from '../../hooks/useClickOutside';

const AuthenticaticatedNavbar = () => {
  const wrapperRef = React.useRef(null);
  const [isFocused, setFocus] = useState(false);

  const handleClick = () => {
    setFocus(!isFocused);
  };

  useClickOutside(() => setFocus(false), wrapperRef);

  return (
    <Fragment>
      <nav className="container navbar navbar-light">
        <Brand />
        <div className="form-inline">
          <UserDefaultImage />
          <div className="position-relative">
            <div>
              <CartIndicator handleClick={handleClick} />
            </div>
            <div ref={wrapperRef}>
              <CartDropdown display={isFocused}>
                <Cart />
                <CartSection focus={isFocused} handleClick={handleClick} />
              </CartDropdown>
            </div>
          </div>
        </div>
      </nav>
    </Fragment>
  );
};
export default AuthenticaticatedNavbar;
