import React, { Fragment, useEffect, useRef, useMemo } from 'react';

import { useHistory } from 'react-router-dom';
// import useUpdateEffect from '../../hooks/useUpdateEffect';
import { useLocationContext } from '../../context/LocationContext';
import Footer from '../../components/footer/Footer';
import ModalRoot from '../modal-root/Index';
import IntroSection from './components/IntroSection';
import DiscoverSection from './components/DiscoverSection';

import ChooseAreaToExploreSection
  from './components/ChooseAreaToExploreSection';

import ReadyToOrderSection from './components/ReadyToOrderSection';

import VerifyPhone from '../verifyPhone';
import { useBusinessGroupContext } from '../../context/BusinessGroupContext';
import { useBusinessCategoriesContext } from '../../context/BusinessCategoriesContext';
import { useBusinessesContext } from '../../context/BusinessesContext';
import { useLoadingContext } from '../../context/UseLoading';
import actions from '../../actions/actions';


const Home = () => {
  let isMounted = useRef(false);
  let isRequest = useRef(false);
  const { push } = useHistory();
  const { loading } = useLoadingContext();
  const { setBizGroup, setBizGroupError } = useBusinessGroupContext();
  const { setBizCategories, setBizCategoriesError } = useBusinessCategoriesContext();
  const { setBusinesses, setBusinessesError } = useBusinessesContext();
  const { coordinates } = useLocationContext();

  useMemo(() => {
    console.log('start usememo fuc', isMounted.current, isRequest.current)
    if (!isRequest.current && isMounted.current && coordinates.length) {
      isRequest.current = true
      loading('START_FETCH', true)
      actions().businesses(coordinates, 'food', null, setBusinesses, setBusinessesError)
      .then(() => actions().businessGroup(coordinates, null, setBizGroup, setBizGroupError))
      .then(() => actions().businessCategories(coordinates, null, setBizCategories, setBizCategoriesError))
      .then(() => loading('STOP_FETCH', false))
      .then(() => push('/feed'))
    }
    isMounted.current = true;
    return () => {
      console.log('cleanup fuc', isMounted.current, isRequest.current)
      isMounted.current = false
      isRequest.current = false
    }
  }, [coordinates, push, loading, setBusinesses, setBusinessesError, setBizGroup, setBizGroupError, setBizCategories, setBizCategoriesError]);

  return (
    <Fragment>
      <ModalRoot push={push} />
      <div className="home">
        <VerifyPhone />
        <IntroSection push={push} />
        <DiscoverSection />
        <ChooseAreaToExploreSection />
        <ReadyToOrderSection />
        <Footer />
      </div>
    </Fragment>
  );
};

export default Home;

Home.defaultProps = {};
