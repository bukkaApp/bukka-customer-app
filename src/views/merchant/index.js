import React, { Fragment } from 'react';
import Footer from '../../components/footer/Footer';

import Toolbar from './components/Toolbar';
import Header from './components/Header';
import Stats from './components/Stats';
import SellingPoint from './components/SellingPoint';
import Experience from './components/Experience';
import Partners from './components/Partners';
import Testimonial from './components/Testimonial';

const Index = () => (
  <Fragment>
    <Toolbar />
    <Header />
    <Stats />
    <SellingPoint />
    <Experience />
    <Partners />
    <Testimonial />
    <Footer />
  </Fragment>
);

export default Index;
