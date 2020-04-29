import React from 'react';

import shortId from 'shortid';

import Row from 'src/components/grid/Row';
import Container from 'src/components/container/Container';
import Headline from 'src/components/Carousel/Headline';
import BukkaCard from 'src/components/Carousel/BukkaCard';

import PropTypes from 'prop-types';

const NearByBukka = ({
  bukkaData,
  title,
  classNames,
  imageHeight,
  children,
  handleRefFocus,
}) => (
  <div className="pt-4 mb-4">
    {title &&
    <Headline handleRefFocus={handleRefFocus} title={title} activeIndex={1} />
    }
    {children}
    <Container>
      {bukkaData.length > 0 && (
        <Row classNames="pb-4">
          {bukkaData.map(bukka => (
            <BukkaCard
              key={shortId.generate()}
              imageUrl={bukka.imageUrl}
              mealName={bukka.title}
              deliveryPrice={bukka.deliveryCost}
              deliveryTime={bukka.deliveryTime}
              rating={bukka.rating}
              imageHeight={imageHeight}
              classNames={classNames}
              dataTarget="#mealModal"
              dataToggle="modal"
            />
          ))}
        </Row>
      )}
    </Container>
  </div>
);

export default NearByBukka;

NearByBukka.defaultProps = {
  children: '',
  heading: true,
  title: '',
  handleRefFocus: () => {},
  props: ''
};

NearByBukka.propTypes = {
  handleRefFocus: PropTypes.func,
  title: PropTypes.string,
  classNames: PropTypes.string.isRequired,
  imageHeight: PropTypes.string.isRequired,
  bukkaData: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.string,
      deliveryCost: PropTypes.number,
      deliveryTime: PropTypes.string,
      rating: PropTypes.string
    })
  ).isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.string
  ])
};
