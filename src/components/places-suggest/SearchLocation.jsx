/* eslint-disable react/prop-types */
import React, { Fragment, useRef } from 'react';

import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import useLocationService from '../../hooks/useLocationService';
// import showLoadingAction from 'src/redux/showLoadingAction';
import MapMarker from '../icons/MapMarker';
import ChevronRight from '../icons/ChevronRight';
import InputField from '../input/InputField';
import DeliveryOrPickupNav from '../delivery-pickup/DeliveryOrPickupNav';
import SuggestionsDropdown from './SuggestionsDropdown';

import './searchlocation.scss';
import useClickOutside from '../../hooks/useClickOutside';

const SearchLocation = ({
  showDeliveryOrPickupNav,
  chevronButtonVisible,
  showDropdown,
}) => {
  const wrapperRef = useRef(null);
  const { push } = useHistory();

  const {
    setFocus,
    isFocused,
    handleChange,
    handleClick,
    geoCodeLocation,
    inputData
  } = useLocationService();

  const handleChevronClick = () => {
    handleClick();
  };

  const showChevronButton = () => {
    if (chevronButtonVisible) {
      return (
        <div
          onClick={handleChevronClick}
          aria-pressed="false"
          tabIndex="0"
          role="button"
          className="input-group-append button-go-feed"
        >
          <span className="input-group-text button-search">
            <ChevronRight />
          </span>
        </div>
      );
    }
    return null;
  };

  useClickOutside(() => setFocus(false), wrapperRef);

  return (
    <div ref={wrapperRef}>
      <div
        className="input-group address-input-section"
        style={{ border: '1 px solid #eceff1' }}
      >
        <div className="input-group-prepend">
          <span className="input-group-text location-marker">
            <MapMarker />
          </span>
        </div>
        <InputField
          type="text"
          name="searchLocation"
          placeholderText="Enter your address..."
          classNames="text-field form-control searchlocation"
          handleFocus={() => setFocus(true)}
          handleChange={handleChange}
          value={inputData}
        />
        {showChevronButton()}
      </div>
      {showDropdown && (<div className="carousel-divider mb-0" />)}
      <div className="dropdown-suggestion">
        {(isFocused || showDropdown) && (
          <Fragment>
            {showDeliveryOrPickupNav ? <DeliveryOrPickupNav /> : null}
            <SuggestionsDropdown
              push={push}
              setLocation={geoCodeLocation}
            />
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default SearchLocation;

SearchLocation.defaultProps = {
  chevronButtonVisible: true,
  showDeliveryOrPickupNav: true,
  showDropdown: false,
};

SearchLocation.propTypes = {
  showDropdown: PropTypes.bool,
  chevronButtonVisible: PropTypes.bool,
  showDeliveryOrPickupNav: PropTypes.bool,
};
