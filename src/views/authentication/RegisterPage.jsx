import React, { useState, Fragment, useEffect, useCallback } from 'react';

import PropTypes from 'prop-types';
import $ from 'jquery';
import { useHistory } from 'react-router-dom';

import PrimaryNavbar from '../../components/navbar';
import Authentication from './components/Authentication';

import Logo from './common/Logo';
import { validateAField, validateAllFields } from './helper/validateFields';

import signUpDomStructure from './signUpDomStructure.json';
import './auth.scss';
import { useUserContext } from '../../context/UserContext';
import { useLoadingContext } from '../../context/UseLoading';
import actions from '../../actions/actions';

export const RegisterPage = ({
  authModal,
  classNames,
}) => {
  const { loading } = useLoadingContext();
  const { push } = useHistory();
  const { loginSuccess, loginError, errorMessage, isAuthenticated } = useUserContext();
  const [isRequested, setIsRequested] = useState(false);
  const [validationErrors, setValidationErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [inputData, setInputData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleLinkOptions = (link) => {
    $('#authModal').modal('hide');
    push(link);
  };

  // fix error message coincedence for both signup and signin
  const errorMsg = isRequested ? errorMessage : '';

  const validateOnClick = (newValidationErrors) => {
    setValidationErrors({
      ...validationErrors,
      ...newValidationErrors,
    });
  };

  const handleChange = ({ target: { name, value } }) => {
    const newFieldData = { [name]: value };
    const validation = validateAField(newFieldData, name);
    setInputData({
      ...inputData,
      ...newFieldData
    });
    setValidationErrors({
      ...validationErrors,
      [name]: validation.message
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validation = validateAllFields(inputData);

    const { errors, passes } = validation;
    validateOnClick(errors);
    if (passes) {
      setIsRequested(true);
      return actions().register(inputData, loading, loginSuccess, loginError);
    }
  };

  const handleRedirection = useCallback(() => {
    if (!authModal && isAuthenticated) {
      return push('/');
    }
  }, [authModal, isAuthenticated, push]);

  useEffect(() => {
    handleRedirection();
  }, [isAuthenticated, handleRedirection]);

  const BukkaLogo = () => {
    if (!authModal) {
      return (
        <div className="pb-3">
          <Logo />
        </div>
      );
    }
    return null;
  };

  const ToolBar = () => {
    if (!authModal) {
      return (
        <PrimaryNavbar push={push} />
      );
    }
    return null;
  };

  return (
    <Fragment>
      <ToolBar />
      <div className="bg-color auth-page">
        <Authentication
          title="Sign Up"
          errorMessage={errorMsg}
          handleChange={handleChange}
          inputData={inputData}
          handleLinkOptions={handleLinkOptions}
          validationErrors={validationErrors}
          handleSubmit={handleSubmit}
          domStructure={signUpDomStructure}
          isFormCompleted
          authModal={authModal}
          classNames={classNames}
        />
        <BukkaLogo />
      </div>
    </Fragment>
  );
};

export default RegisterPage;

RegisterPage.defaultProps = {
  authModal: false,
  classNames: '',
};

RegisterPage.propTypes = {
  authModal: PropTypes.bool,
  classNames: PropTypes.string,
};
