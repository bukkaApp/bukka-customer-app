/* eslint-disable max-len */
/* eslint-disable react/prop-types */
import React, { useEffect, useState, useCallback } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { useHistory } from 'react-router-dom';
import Container from 'src/components/container/Container';

import NoNearByBukkaLocation
  from 'src/components/not-found/NoNearByBukkaLocation';
import LocationNavLargeScreen
  from 'src/components/common-navs/LocationNavLargeScreen';
import LocationNavSmallScreen, {
  SelectLocationModal,
} from 'src/components/common-navs/LocationNavSmallScreen';

import Map from 'src/components/map';
import Carousel from 'src/components/Carousel/Carousel';
import { useLocationContext } from 'src/context/LocationContext';
import BukkasToExploreSection from './BukkasToExploreSection';

import IntroSection from '../common/IntroSection';
import AreasToExplore from '../common/AreasToExplore';
import ExploreSection from '../common/ExploreSection';
import FoodNearBy from './FoodNearBy';
import { foodBannerImage } from '../img/imgLinks';

import freeDelivery from '../data/free-delivery.json';
import favorites from '../data/favorites.json';
import { useBusinessCategoriesContext } from '../../../context/BusinessCategoriesContext';
import { useBusinessGroupContext } from '../../../context/BusinessGroupContext';
import { useBusinessesContext } from '../../../context/BusinessesContext';
import { useLoadingContext } from '../../../context/UseLoading';

const mapContainerDisplay = displayMap => (
  displayMap
    ? 'px-0 d-flex flex-column flex-xl-row flex-lg-row flex-md-column'
    : 'px-0'
);

const mapContentDisplay = displayMap => (
  displayMap
    ? 'nearby-bukka col-xl-4 px-0 d-lg-flex d-md-none d-none'
    : 'mb-5'
);

const mapDisplay = displayMap => (
  displayMap
    ? 'container map-wrapper col-xl-8 col-lg-8 col-md-12col-12 order-first order-lg-0'
    : 'd-none'
);

const FoodSection = ({ mode }) => {
  console.log('ffjfaj loggin')
  const { push } = useHistory();
  const { loading } = useLoadingContext();
  const { fetchBusinessCategories } = useBusinessCategoriesContext();
  const { fetchBusinessGroup } = useBusinessGroupContext();
  const { fetchBusinesses, errorMessage, businesses } = useBusinessesContext();
  const { coordinates } = useLocationContext();
  const [displayMap, setDisplayMap] = useState(false);

  const handleClick = () => {
    setDisplayMap(!displayMap);
  };

  const handleFetchOnRefresh = useCallback(() => {
    if (!loading && businesses.length === 0
      && coordinates.length && !errorMessage) {
      new Promise((resolve) => {
        resolve(fetchBusinessGroup(coordinates));
      }).then(() => fetchBusinesses(coordinates))
        .then(() => fetchBusinessCategories(coordinates));
    }
  }, [coordinates, loading, businesses, errorMessage]);

  useEffect(() => {
    if (coordinates.length < 2) {
      push('/');
    }
  }, [coordinates]);

  useEffect(() => {
    handleFetchOnRefresh();
  }, [businesses]);

  if (!loading && businesses.length === 0
    && coordinates.length !== 0 && errorMessage) {
    return <NoNearByBukkaLocation history={{ push }} />;
  }

  return (
    <div className="container-fluid p-0">
      <SelectLocationModal />
      {businesses.length > 0 && (
        <div>
          <IntroSection push={push} />
          <ExploreSection>
            <div className={displayMap ? 'd-none' : ''}>
              <AreasToExplore bgImage={foodBannerImage} />
            </div>
            <div
              className={displayMap ? 'feed-main-content-map' : 'feed-main-content'}
            >
              <LocationNavLargeScreen handleMapClick={handleClick} />
              <LocationNavSmallScreen />
              <div>
                {mode === 'delivery' && <BukkasToExploreSection />}
                <Container classNames={mapContainerDisplay(displayMap)}>
                  <div className={mapContentDisplay(displayMap)}>
                    <FoodNearBy
                      delivery
                      classNames={displayMap ? 'col-12' : 'col-xl-4 col-md-6 col-sm-12'}
                      title={displayMap ? '' : 'Nearby'}
                      imageHeight={displayMap ? 'map-img-height' : 'img-height'}
                      errorMessage={errorMessage}
                    />
                  </div>
                  <div className={mapDisplay(displayMap)}>
                    <Map />
                    {/* <Map restaurants={nearbyBukkas} coordinates={coordinates} /> */}
                  </div>
                  {/* display carousel for map on small & medium screen */}
                  {displayMap && (
                    <div className="d-flex d-md-flex d-lg-none d-xl-none px-0 col-12">
                      <Carousel
                        delivery
                        noOfImagesShown={3}
                        xl={3}
                        lg={2}
                        md={2}
                        sm={1}
                        slideItems={[...favorites, ...freeDelivery]}
                        imageHeight="img-fluid"
                        classNames="col-lg-6 col-md-6 col-sm-12 col-12"
                      />
                    </div>
                  )}
                </Container>
              </div>
            </div>
          </ExploreSection>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = ({ deliveryModeReducer: { mode } }) => ({
  mode,
});

export default connect(
  mapStateToProps,
)(FoodSection);

FoodSection.propTypes = {
  mode: PropTypes.string.isRequired,
};
