import React, { Fragment, useState, useEffect } from 'react';

import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import $ from 'jquery';

import PrimaryNavbar from '../../components/navbar';
import urlFilter from '../../shared/urlFilter';
import Authentication from './components/Authentication';
import Logo from './common/Logo';
import { validateAField, validateAllFields } from './helper/validateFields';
import actions from '../../actions/actions';
import signInDomStructure from './signInDomStructure.json';
import './auth.scss';
import { useUserContext } from '../../context/UserContext';
import { useLoadingContext } from '../../context/UseLoading';

export const LoginPage = ({
  authModal,
  classNames,
}) => {
  const { loading } = useLoadingContext();
  const { push, location: { search } } = useHistory();
  const { errorMessage, isAuthenticated, loginError, loginSuccess } = useUserContext();
  const [isRequested, setIsRequested] = useState(false);
  const [nextSlide, setNextSlide] = useState(false);

  const [validationErrors, setValidationErrors] = useState({
    email: '',
    password: ''
  });

  const [inputData, setInputData] = useState({
    email: '',
    password: ''
  });

  const handleLinkOptions = (link) => {
    $('#authModal').modal('hide');
    push(link);
  };

  // fix error message coincedence for both signup and signin
  const errorMsg = isRequested ? errorMessage : '';

  const validateOnClick = (newValidationError) => {
    setValidationErrors({
      ...validationErrors,
      ...newValidationError,
    });
  };

  const handleChange = ({ target: { name, value } }) => {
    const newFieldData = { [name]: value };
    const validation = validateAField(newFieldData, name, true);
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
    const validation = validateAllFields(inputData, true);

    const { errors, passes } = validation;
    validateOnClick(errors);
    // if No AutoSuggestion
    if (!errors.email && errors.password && !nextSlide) {
      setNextSlide(true);
      setValidationErrors({ ...validationErrors, password: '' });
    }
    if (passes) {
      setNextSlide(true);
      if (nextSlide) {
        setIsRequested(true);
        return actions().login(inputData, loading, loginSuccess, loginError);
      }
    }
  };

  const goToPrev = () => {
    setNextSlide(false);
  };

  useEffect(() => {
    if (search) {
      const redirect = urlFilter(search);
      if (isAuthenticated) push(redirect);
    }
    if (!authModal && !search && isAuthenticated) {
      return push('/');
    }
  }, [search, authModal, isAuthenticated, push]);

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
          title="Log In"
          inputData={inputData}
          handleLinkOptions={handleLinkOptions}
          errorMessage={errorMsg}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          domStructure={signInDomStructure}
          validationErrors={validationErrors}
          isFormCompleted
          authModal={authModal}
          classNames={classNames}
          userEmail={inputData.email}
          slideToNextInput={nextSlide}
          handleBackClick={goToPrev}
        />
        <BukkaLogo />
      </div>
    </Fragment>
  );
};

export default LoginPage;

LoginPage.defaultProps = {
  errorMessage: '',
  authModal: false,
  classNames: '',
};

LoginPage.propTypes = {
  authModal: PropTypes.bool,
  classNames: PropTypes.string,
};
