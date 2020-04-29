import React from 'react';

import PropTypes from 'prop-types';
import Button from '../../../components/button/Button';
import { useSelectFormContext } from '../../../context/SelectFormContext';

import './authfooter.scss';

const signUpTextOption = 'Already have an account?';

const signInTextOptions = 'New to Bukka?';

const AuthFooter = ({
  title,
}) => {
  const { setSelectForm } = useSelectFormContext();

  const goToAuthRoute = ({ target: { id } }) => {
    setSelectForm(id);
  };

  let btnAttribute = { handleClick: goToAuthRoute };

  const formType = title === 'Sign Up';
  const AltOption = (
    <div className="form-options padding">
      <p>{formType ? signUpTextOption : signInTextOptions}</p>
      <Button
        id={formType ? '/login' : '/signup'}
        type="button"
        {...btnAttribute}
        classNames="btn-link auth-footer-btn"
        text={formType ? 'LOG IN' : 'SIGN UP'}
      />
    </div>
  );
  return AltOption;
};

export default AuthFooter;

AuthFooter.defaultProps = {
  title: 'Sign Up'
};

AuthFooter.propTypes = {
  title: PropTypes.string
};

