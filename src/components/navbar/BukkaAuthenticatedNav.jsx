import React, { Fragment, useState } from 'react';

import { useHistory } from 'react-router-dom';

import Magnifier from '../icons/Magnifier';
import Button from '../button/Button';
import Brand from '../brand/Brand';
import NavLink from '../navlink/Navlink';
import UserDefaultImage from './common/UserDefaultImage';
import CartSection from '../cart/CartIndicator';
import EmptyCart, { CartDropdown } from '../cart/Cart';
import CartIconSection from '../cart/CartSection';

import './bukka-authenticated-nav.scss';
import SearchAnything from '../search/SearchAnything';
import useClickOutside from '../../hooks/useClickOutside';
import { useSelectFormContext } from '../../context/SelectFormContext';
import { useUserContext } from '../../context/UserContext';

const buttonProps = [
  { name: 'Food', href: '/feed' },
  { name: 'Fresh', href: '/fresh' },
  { name: 'Mart', href: '/mart' }
];

const CartScene = () => {
  const wrapperRef = React.useRef(null);
  const [isFocused, setFocus] = useState(false);

  const handleClick = () => {
    setFocus(!isFocused);
  };

  useClickOutside(() => setFocus(false), wrapperRef);

  return (
    <div className="position-relative">
      <div>
        <CartSection handleClick={() => handleClick('cart')} />
      </div>
      <div ref={wrapperRef}>
        <CartDropdown display={isFocused}>
          <EmptyCart />
          <CartIconSection />
        </CartDropdown>
      </div>
    </div>
  );
};

const BukkaAuthenticatedNav = ({ status }) => {
  const wrapperRef = React.useRef(null);
  const { setSelectForm } = useSelectFormContext();
  const { isAuthenticated } = useUserContext();
  const { push } = useHistory();

  const defaultProps = {
    search: false,
    searchBtn: false
  };

  const [isFocused, setFocus] = useState({
    search: false,
    searchBtn: false
  });

  const handleClick = (name) => {
    setFocus({
      ...defaultProps,
      [name]: true
    });
  };

  useClickOutside(() => setFocus({ ...defaultProps }), wrapperRef);

  const navigateToAuth = ({ target: { id } }) => {
    push(id);
  };

  const goToAuthRoute = ({ target: { id } }) => {
    setSelectForm(id);
  };

  const windowWidth = window.innerWidth;
  let btnAttribute = { handleClick: navigateToAuth };
  if (windowWidth > 767) {
    btnAttribute = {
      dataToggle: 'modal',
      dataTarget: '#authModal',
      handleClick: goToAuthRoute
    };
  }
  let AuthScene = () => (
    <Fragment>
      <Button
        type="button"
        text="sign in"
        classNames="small-outline-button bg-transparent"
        id="/login"
        {...btnAttribute}
      />
      <Button
        type="button"
        text="sign up"
        classNames="small-button mr-0"
        id="/signup"
        {...btnAttribute}
      />
    </Fragment>
  );

  if (isAuthenticated) {
    AuthScene = () => (
      <Fragment>
        <div
          className="pb-3 mx-3 icon d-lg-none"
        >
          <span
            tabIndex="0"
            aria-pressed="false"
            role="button"
            onClick={() => handleClick('searchBtn')}
          >
            <Magnifier />
          </span>
        </div>
        <UserDefaultImage />
        <CartScene />
      </Fragment>
    );
  }

  return (
    <nav ref={wrapperRef} className="container navbar navbar-light">
      <div className="row mx-0">
        {!isFocused.searchBtn &&
          <Brand />
        }
        <div className={`pl-lg-5
              ${isFocused.searchBtn ? ''
      : 'd-none d-md-none d-lg-inline-flex'}`}
        >
          <SearchAnything
            handleClick={
              isFocused.searchBtn ?
                () => {}
                : () => handleClick('search')
            }
            focus={
              isFocused.searchBtn ?
                isFocused.searchBtn
                : isFocused.search
            }
          />
        </div>
      </div>
      {!isFocused.searchBtn &&
        <div ref={wrapperRef} className="form-inline">
          <div className="d-none bukka-md-inline-flex">
            {buttonProps.map(propData => (
              <NavLink
                text={propData.name}
                key={propData.name}
                classNames="bukka-btn"
                href={propData.href}
              />
            ))}
          </div>
          <AuthScene />
        </div>
      }
    </nav>
  );
};

export default BukkaAuthenticatedNav;

BukkaAuthenticatedNav.propTypes = {};
