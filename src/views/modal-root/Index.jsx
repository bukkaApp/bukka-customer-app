import React from 'react';

import PropTypes from 'prop-types';

import AuthModal from '../../components/navbar/common/AuthModal';
import InviteFriends from '../invite/InviteFriends';

export const Index = ({ push }) => (
  <>
    <AuthModal push={push} />
    <InviteFriends push={push} />
  </>
);

export default Index;

Index.propTypes = {
  push: PropTypes.func.isRequired,
};
