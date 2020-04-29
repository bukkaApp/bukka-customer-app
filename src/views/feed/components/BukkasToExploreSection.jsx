/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import React, { Fragment } from 'react';

// import PropTypes from 'prop-types';

import Carousel from 'src/components/Carousel/Carousel';

import bukkaData from '../data/bukkaData.json';
// import topCategories from '../data/cuisine.json';
import { useBusinessGroupContext } from '../../../context/BusinessGroupContext';
import { useBusinessCategoriesContext } from '../../../context/BusinessCategoriesContext';

const renameCategory = name => (
  name.toLowerCase() === 'new' ?
    'New on Bukka' : name
);

const Features = () => (
  <Fragment>
    <div className="carousel-divider" />
    <div className="pt-0 p-sm-3" />
    <Carousel
      noOfImagesShown={2}
      xl={2}
      title="Featured"
      carouselType="collection"
      textOverlay
      top
      slideItems={bukkaData}
      imageHeight="img-fluid"
      classNames="col-lg-6 col-md-6 col-sm-11 col-11"
    />
  </Fragment>
);

const BusinessGroup = () => {
  const { businessGroups } = useBusinessGroupContext();
  return (
    <Fragment>
      <div className="carousel-divider" />
      {
        (businessGroups && businessGroups.length > 0) &&
          businessGroups.map(promoBukkas => (
            promoBukkas.category.length > 0 ?
              <Fragment key={`promo${promoBukkas._id}`}>
                <Carousel
                  delivery
                  noOfImagesShown={3}
                  xl={3}
                  lg={2}
                  md={2}
                  sm={1}
                  placeId={promoBukkas._id}
                  description={promoBukkas.description}
                  numberOfViews={promoBukkas.numItems}
                  title={renameCategory(promoBukkas.name)}
                  slideItems={promoBukkas.category}
                  controlClassNames="custom-mt-minus22"
                  imageHeight="img-fluid"
                  classNames="col-xl-4 col-md-6 col-sm-11 col-11"
                />
                <div className="carousel-divider" />
              </Fragment> : null
          ))
      }
    </Fragment>
  );
};

const BusinessCategory = () => {
  const { categories } = useBusinessCategoriesContext();
  return (
    (categories && categories.length > 0) &&
      <Fragment>
        <Carousel
          type="majorCuisine"
          noOfImagesShown={5}
          xl={5}
          lg={4}
          md={4}
          sm={2}
          textOverlay
          carouselType="cuisine"
          textPositionBottom
          title="Top Categories"
          imageHeight="img-fluid"
          slideItems={categories}
          classNames="col-lg-3 col-md-3 col-sm-5 col-5 touchdown"
        />
        <div className="carousel-divider" />
      </Fragment>
  );
};

const BukkasToExploreSection = () => (
  <Fragment>
    <Features />
    <BusinessGroup />
    <BusinessCategory />
  </Fragment>
);

export default BukkasToExploreSection;

BukkasToExploreSection.propTypes = {};
