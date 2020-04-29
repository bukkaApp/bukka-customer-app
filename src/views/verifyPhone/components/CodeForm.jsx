import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Spinner } from 'react-bootstrap';
import Button from '../../../components/button/Button';

const CodeForm = ({
  handleSubmit,
  sent,
  errors,
  handleChange,
  inputData,
  errorMessage,
  handleSendContact,
  stopCodeSpinner,
}) => {
  const [count, setCount] = useState(60);
  const [codeSent, setCodeSent] = useState(false);
  const [success, setSuccess] = useState(false);

  const resenCode = () => {
    setCodeSent(true);
    handleSendContact(
      {
        contactMobile: inputData.contactMobile,
      },
      () => {
        setSuccess(true);
      },
    );
  };

  useEffect(() => {
    let interval;
    if (count > 0) {
      interval = setInterval(() => {
        setCount(count ? count - 1 : 0);
      }, 1000);
    }

    if (errorMessage !== '') {
      stopCodeSpinner();
    }

    return () => {
      clearInterval(interval);
    };
  }, [count, errorMessage]);

  return (
    <>
      <h5 className="text-center" style={{ fontSize: '16px' }}>
        A code has been sent to <span className="text-danger">
          {`+234${inputData.contactMobile}`}</span>
      </h5>
      <div className="sub-text">
        <div style={{ fontSize: '14px' }} className="p text-bold">
          Please type the code in the input field below
        </div>
        <div className="p font-italic">
          <span className=" text-muted">{'didn\'t'} receive a code, </span>
          <button
            role="link"
            onClick={resenCode}
            disabled={count > 0}
            className="bg-transparent border-none codeform-resend-btn"
          >
            {!codeSent && 'resend-code'}
          </button>{' '}
          {codeSent && (
            <>
              {!success && (
                <Spinner
                  animation="border"
                  as="span"
                  aria-hidden="true"
                  variant="danger"
                />
              )}
            </>
          )}
          {success && <span className="text-info">code sent</span>}
          {count > 0 && (
            <>
              in <span className="badge badge-dark font-size-15">{count}</span>
            </>
          )}
        </div>
      </div>
      <div>
        <div className="mt-3 mb-3">
          <input
            type="text"
            name="code"
            placeholder="Enter code..."
            onChange={handleChange}
            className="form-control"
          />
          <small className="text-danger error-margin-left">
            {errors.code}
          </small>
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
              'Verify'
            )}
          </>
        </Button>
      </div>
    </>
  );
};

CodeForm.defaultProps = {
  error: {},
};

CodeForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  sent: PropTypes.bool.isRequired,
  errors: PropTypes.objectOf(PropTypes.string),
  inputData: PropTypes.objectOf(PropTypes.string).isRequired,
  errorMessage: PropTypes.string.isRequired,
  handleSendContact: PropTypes.func.isRequired,
  stopCodeSpinner: PropTypes.func.isRequired,
};

export default CodeForm;
