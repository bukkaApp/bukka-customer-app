import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import PropTypes from 'prop-types';

// import SmallSpinner from '../../../components/spinners/SmallSpinner';
import Row from 'src/components/grid/Row';
import Container from 'src/components/container/Container';
import Headline from 'src/components/Carousel/Headline';
import BukkaCard from 'src/components/Carousel/BukkaCard';

// import { useLocationContext } from '../../../context/LocationContext';
import { useBusinessesContext } from '../../../context/BusinessesContext';

const FoodNearBy = ({
  delivery,
  title,
  classNames,
  // children,
  handleRefFocus,
  errorMessage,
}) => {
  console.log('fdfffdfd done');
  const { businesses, /* currentPage */ } = useBusinessesContext();
  // const { coordinates } = useLocationContext();

  return (
    <div className="mt-4 mb-4">
      {title && (
        <Headline handleRefFocus={handleRefFocus} title={title} activeIndex={1} />
      )}
      {/* {children} */}
      <Container>
        <InfiniteScroll
          loadMore={() => console.log('work in progress')
            /* fetchMoreBukkas(coordinates, Number(currentPage) + 1) */}
          hasMore={
            errorMessage !== 'There are currently no bukkas in your location'
          }
          loader={
            <div className="loader text-center" key={0}>
              <div className="spinner-grow custom-text-color" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          }
          useWindow
          initialLoad={false}
        >
          <Row classNames="pb-4">
            {businesses.length && businesses.map(bukka => (
              <BukkaCard
                key={`nearby-company-${title.split(' ').join('-')}-${bukka._id}`}
                imageUrl={bukka.imageUrl}
                mealName={bukka.name}
                delivery={delivery}
                tags={bukka.placeGroup}
                deliveryPrice={bukka.deliveryPrice}
                deliveryTime={bukka.deliveryTime}
                rating={bukka.rating}
                imageHeight="img-fluid"
                classNames={classNames}
                href={`/bukka/${bukka.slug}`}
              />
            ))}
          </Row>
        </InfiniteScroll>
      </Container>
    </div>
  );
};

export default FoodNearBy;

FoodNearBy.defaultProps = {
  children: '',
  heading: true,
  title: '',
  delivery: false,
  handleRefFocus: () => {},
  errorMessage: '',
};

FoodNearBy.propTypes = {
  delivery: PropTypes.bool,
  handleRefFocus: PropTypes.func,
  title: PropTypes.string,
  classNames: PropTypes.string.isRequired,
  fetchMoreBukkas: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.string
  ])
};
