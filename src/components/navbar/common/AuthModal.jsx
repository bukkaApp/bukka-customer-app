import React from 'react';
import $ from 'jquery';
import AuthenticateLogin from '../../../views/authentication/LoginPage';

import AuthenticateRegister from '../../../views/authentication/RegisterPage';
import useUpdateEffect from '../../../hooks/useUpdateEffect';
import Modal from '../../modal';
import DismissModal from '../../modal/DismissModal';
import { useUserContext } from '../../../context/UserContext';
import { useHistory } from 'react-router-dom';
import { useSelectFormContext } from '../../../context/SelectFormContext';

const AuthModal = () => {
  const { push } = useHistory();
  const { type } = useSelectFormContext();
  const { isAuthenticated } = useUserContext();
  let AuthForm = AuthenticateLogin;

  if (type === '/signup') {
    AuthForm = AuthenticateRegister;
  }

  useUpdateEffect(() => {
    if (isAuthenticated) $('#authModal').modal('hide');
    return () => $('#authModal').modal('hide');
  }, [isAuthenticated]);

  return (
    <div className="container">
      <Modal.Custom dataTarget="authModal" classNames="auth-modal">
        <DismissModal classNames="close" />
        <AuthForm
          authModal
          history={{ push }}
          classNames="pt-5"
        />
      </Modal.Custom>
    </div>
  );
};

export default AuthModal;

AuthModal.defaultProps = {
  type: '/login',
};

AuthModal.propTypes = {};
