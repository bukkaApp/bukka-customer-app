import React, { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux';

import { PersistGate } from 'redux-persist/integration/react';

import reduxStore from '../redux/store';

import Main from './Main';
import IndeterminateProgressbar from
  '../components/progress-bar/IndeterminateProgressbar';

import './index.scss';
import './animate.scss';
import Primary from '../provider/Primary';
import Secondary from '../provider/Secondary';
import Loader from '../components/loader/Loader';

const { store, persistor } = reduxStore();

const App = () => (
  <Suspense fallback={<Loader />}>
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Primary>
            <IndeterminateProgressbar />
            <Secondary>
              <Main />
            </Secondary>
          </Primary>
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </Suspense>
);

export default App;
