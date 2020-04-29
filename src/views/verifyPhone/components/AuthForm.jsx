import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Spinner } from 'react-bootstrap';
import Button from '../../../components/button/Button';
import InputField from '../../../components/input/InputField';
import AuthService from '../../../shared/authServices';

const AuthForm = ({
  handleSubmit,
  handleChange,
  sent,
  errors,
  errorMessage,
  stopPhoneSpinner,
  inputData,
}) => {
  useEffect(() => {
    if (errorMessage !== '') {
      stopPhoneSpinner();
    }
  }, [errorMessage]);

  return (
    <>
      <h3>Add your phone number</h3>
      <div className="sub-text">
        <div className="p">Please verify your phone number</div>
        <div className="p">for your account</div>
        <div className="p bold">{AuthService.getEmail()}</div>
      </div>
      <div className="input-section">
        <div className="form-group">
          <div className="space">
            <div className="d-flex">
              <div className="p mt-2 prefix">+234</div>
              <InputField
                name="contactMobile"
                classNames="default-input"
                type="text"
                placeholderText="phone"
                handleChange={handleChange}
                value={inputData.contactMobile}
                error={errors.contactMobile}
                handleFocus={() => {}}
              />
            </div>
            <small className="text-danger error-margin-left">
              {errors.contactMobile}
            </small>
          </div>
        </div>
        <Button
          type="button"
          handleClick={handleSubmit}
          classNames="primary-button w-100"
        >
          <>
            {sent ? (
              <Spinner
                as="span"
                aria-hidden="true"
                animation="border"
                variant="light"
              />
            ) : (
              'Submit'
            )}
          </>
        </Button>
      </div>
    </>
  );
};

AuthForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  sent: PropTypes.bool.isRequired,
  inputData: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])).isRequired,
  errors: PropTypes.objectOf(PropTypes.string).isRequired,
  errorMessage: PropTypes.string.isRequired,
  stopPhoneSpinner: PropTypes.func.isRequired,
};

export default AuthForm;
