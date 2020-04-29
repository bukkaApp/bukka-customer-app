/* eslint-disable react/jsx-indent */
/* eslint-disable max-len */
import React, { useEffect, Fragment, useState, useCallback } from 'react';

import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Container from 'src/components/container/Container';

import shortId from 'shortid';

import Row from 'src/components/grid/Row';
import Headline from 'src/components/Carousel/Headline';
import BukkaCard from 'src/components/Carousel/BukkaCard';
import UnAuthenticatedCheckout from 'src/components/common-navs/UnAuthenticatedCheckout';
import LocationNavLargeScreen from 'src/components/common-navs/LocationNavLarge';
import LocationNavSmallScreen, {
  SelectLocationModal,
} from 'src/components/common-navs/LocationNavSmallScreen';
import BukkaNavSmallScreen from 'src/components/navbar/BukkaNavSmallScreen';
import CheckoutButton from 'src/components/common/CheckoutButton';
import NoNearByBukkaLocation from 'src/components/not-found/NoNearByBukkaLocation';
import setMealToDisplayAction from 'src/redux/setMealToDisplayAction';
import fetchBukkaMenuAction from 'src/redux/fetchBukkaMenuAction';

import fetchFreshOrMartAction from 'src/redux/fetchFreshOrMartAction';
import { useLocationContext } from 'src/context/LocationContext';
import IntroSection from '../common/IntroSection';
import AreasToExplore from '../common/AreasToExplore';
import ExploreSection from '../common/ExploreSection';

import { drinkBannerImage, freshBannerImage } from '../img/imgLinks';

const OtherSection = ({
  bukkaMenu,
  categories,
  error,
  errorMessage,
  fetched,
  setMealToDisplay,
  type,
  fetchNearbyBukkas,
}) => {
  const { push } = useHistory();
  const { coordinates } = useLocationContext();
  const [searchQuery, setSearchQuery] = useState('');

  const isMart = type === 'mart';

  const fetchFreshorMart = useCallback(() =>
    fetchNearbyBukkas(coordinates, type)
  , [coordinates, type]);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchFreshorMart();
  }, []);

  if (bukkaMenu.length === 1 && error) {
    return <NoNearByBukkaLocation push={push} />;
  }

  return (
    <div className="container-fluid p-0">
      <SelectLocationModal />
      {bukkaMenu.length > 1 && fetched && (
        <div>
          <IntroSection push={push} />
          <ExploreSection>
            <AreasToExplore
              text={isMart ? 'Mart' : 'Groceries.'}
              bgImage={isMart ? drinkBannerImage : freshBannerImage}
            />
            <div className="feed-main-content">
              <LocationNavLargeScreen
                scheduleTime
                handleSearch={event => setSearchQuery(event.target.value)}
                categoryItems={categories}
                section={type}
              />
              <BukkaNavSmallScreen currentCategory="Wine Under $20" />
              <LocationNavSmallScreen />
              <div id="flyout-left-container">
                {categories.map(category => (
                  <Fragment key={shortId.generate()}>
                    <div className="carousel-divider" />
                    <Container classNames="px-0">
                      <div className="mt-4 mb-4">
                        <Headline title={category} activeIndex={1} />
                        <Container>
                          <Row classNames="pb-4">
                            {bukkaMenu.map(menu => (
                              <>
                                {menu.category === category &&
                                  menu.title
                                    .toLowerCase()
                                    .includes(searchQuery.toLowerCase()) && (
                                  <BukkaCard
                                    key={shortId.generate()}
                                    imageUrl={menu.imageUrl}
                                    mealName={menu.title}
                                    other
                                    deliveryPrice={menu.deliveryCost}
                                    imageHeight="fresh-img-height"
                                    classNames="col-lg-3 col-md-4 col-sm-6 col-6"
                                    handleClick={() =>
                                      setMealToDisplay(menu.slug, null, true)
                                    }
                                  />
                                )}
                              </>
                            ))}
                          </Row>
                        </Container>
                      </div>
                    </Container>
                  </Fragment>
                ))}
              </div>
            </div>
          </ExploreSection>
        </div>
      )}
      <CheckoutButton />
      <UnAuthenticatedCheckout push={push} />
    </div>
  );
};

const mapStateToProps = ({
  fetchBukkaMenuReducer: {
    bukkaMenu,
    categories,
    status: { error, fetched },
  },
  cartReducer: { errorMessage },
}) => ({
  bukkaMenu,
  categories,
  error,
  fetched,
  errorMessage,
});

export default connect(
  mapStateToProps,
  {
    fetchBukkaMenu: fetchBukkaMenuAction,
    setMealToDisplay: setMealToDisplayAction,
    fetchNearbyBukkas: fetchFreshOrMartAction
  },
)(OtherSection);

OtherSection.propTypes = {
  fetchedBukkas: PropTypes.shape({
    nearbyBukkas: PropTypes.arrayOf(PropTypes.shape({})),
  }).isRequired,
};
