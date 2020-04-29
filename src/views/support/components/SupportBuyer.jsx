import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import BannerSection from '../common/BannerSection';
import SupportMainSection from './SupportMainSection';
import { useUserContext } from 'context/UserContext';

const SupportBuyer = ({ authenticated }) => (
  <div>
    <BannerSection />
    <SupportMainSection authenticated={useUserContext().isAuthenticated} />
  </div>
);


export default SupportBuyer;

SupportBuyer.propTypes = {};
