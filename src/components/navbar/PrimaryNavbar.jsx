import React, { Fragment } from 'react';

import PropTypes from 'prop-types';
import Button from '../button/Button';
import Brand from '../brand/Brand';
import './navbar.scss';
import { useSelectFormContext } from '../../context/SelectFormContext';
import { useHistory } from 'react-router-dom';

const PrimaryNavbar = ({ authButton }) => {
  const { push } = useHistory();
  const { setSelectForm } = useSelectFormContext()
  const navigateToAuth = ({ target: { id } }) => {
    push(id);
  };

  const goToAuthRoute = ({ target: { id } }) => {
    setSelectForm(id);
  };

  const minWidth = window.innerWidth;
  let btnAttribute = { handleClick: navigateToAuth };
  if (minWidth > 767) {
    btnAttribute = {
      dataToggle: 'modal',
      dataTarget: '#authModal',
      handleClick: goToAuthRoute
    };
  }

  return (
    <Fragment>
      <div className="">
        <nav className="container navbar navbar-light">
          <Brand />
          {authButton &&
          <div className="form-inline">
            <Button
              type="button"
              text="sign in"
              {...btnAttribute}
              classNames="small-outline-button"
              id="/login"
            />
            <Button
              type="button"
              text="sign up"
              {...btnAttribute}
              classNames="small-button"
              id="/signup"
            />
          </div>
          }
        </nav>
      </div>
    </Fragment>
  );
};

export default PrimaryNavbar;

PrimaryNavbar.defaultProps = {
  authButton: false
};

PrimaryNavbar.propTypes = {
  authButton: PropTypes.bool,
};
