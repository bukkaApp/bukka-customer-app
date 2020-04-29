import React from 'react';

import PropTypes from 'prop-types';

import './termsandconditions.scss';

const TermsAndConditions = ({ title, handleLinkOptions }) => {
  if (title === 'Sign Up') {
    return (
      <div className="form-group padding terms">
        <p>
          By clicking the Sign Up or Facebook button, you agree to our{' '}
          <span
            onClick={() => handleLinkOptions('/legal/terms')}
            aria-pressed="false"
            role="button"
            tabIndex="0"
            className="link"
          >
            Terms of Service
          </span>
          {' '}and{' '}
          <span
            onClick={() => handleLinkOptions('/legal/privacy')}
            aria-pressed="false"
            role="button"
            tabIndex="0"
            className="link"
          >
            Privacy Policy
          </span>.
        </p>
      </div>
    );
  }
  return null;
};

export default TermsAndConditions;

TermsAndConditions.defaultProps = {
  title: 'Sign Up',
  handleLinkOptions: () => {}
};

TermsAndConditions.propTypes = {
  title: PropTypes.string,
  handleLinkOptions: PropTypes.func,
};
