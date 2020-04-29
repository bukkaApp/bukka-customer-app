import React, { useEffect } from 'react';

import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { useLocationContext } from '../../../context/LocationContext';
import Container from '../../../components/container/Container';
import Navbar from '../../../components/navbar';
import NotAvailable from '../../../components/not-found/NotAvailable';

import IntroSection from '../common/IntroSection';
import ExploreSection from '../common/ExploreSection';
import NearByBukka from './NearByBukka';
import { useBusinessesContext } from '../../../context/BusinessesContext';

// TODO: Don't  display time if bukkas are not avaailable or they have closed

const Favorites = ({ status: { error } }) => {
  const { businesses, fetchBusinesses } = useBusinessesContext();
  const { push } = useHistory();
  const { coordinates } = useLocationContext();

  useEffect(() => {
    fetchBusinesses(coordinates);
  }, [coordinates]);

  if (businesses.length === 0 && error) {
    return (
      <div>
        <Navbar push={push} />
        <NotAvailable />
      </div>
    );
  }

  return (
    <div className="container-fluid p-0">
      {businesses.length >= 0 && (
        <div>
          <IntroSection push={push} />
          <ExploreSection classNames="pt-5">
            <Container classNames="position-sticky top-114">
              <h2 className="place-group-header pt-100 px-15 capitalize pb-3">
                Your Favorites
              </h2>
            </Container>
            <div className="border-top" />
            <Container classNames="position-relative bg-white">
              <NearByBukka
                classNames="col-xl-4 col-md-6 col-sm-12"
                heading={false}
                bukkaData={businesses}
                imageHeight="img-fluid"
              />
            </Container>
          </ExploreSection>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = ({
  bukkasReducer: { status },
}) => ({
  status,
});

export default connect(
  mapStateToProps
)(Favorites);

Favorites.propTypes = {
  status: PropTypes.objectOf(PropTypes.bool).isRequired
};
