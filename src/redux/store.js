import { applyMiddleware, createStore, combineReducers } from 'redux';
import logger from 'redux-logger'; // eslint-disable-line
import thunk from 'redux-thunk';
// import { routerMiddleware } from 'react-router-redux';
// import navbarAuthReducer from '../components/navbar/reducers/navbarAuthReducer';

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import checkoutModeReducer from '../components/common-navs/reducers/checkoutModeReducer';
import reportIssueReducer from '../views/support/reducer/reportIssueReducer';
// import authenticationReducer from '../features/authentication/reducers';
import loadingReducer from './loadingReducer';

// import deliveryModeReducer from '../components/common-navs/reducers/deliveryModeReducer';

// import bukkasReducer from 'src/features/feed/reducers/bukkasReducer';
// import fetchUserAddress from '../views/profile/reducers/fetchUserAddress';
// import fetchUserData from '../views/profile/reducers/fetchUserData';
// import postUserAddress from '../views/profile/reducers/postUserAddress';
// import postUserData from '../views/profile/reducers/postUserData';
// import displayTrackingReducer from '../views/history/reducers/displayTrackingReducer';
// import getOrderHistoryReducer from '../views/history/reducers/getOrderHistoryReducer';
import validateTokenReducer from '../views/forgotPassword/reducers/validateTokenReducer';
import requestPasswordChangesReducer from '../views/forgotPassword/reducers/requestPasswordChangesReducer';
import changePasswordReducer from '../views/forgotPassword/reducers/changePasswordReducer';
// import fetchBukkaReducer from '../views/bukka/reducers/fetchBukkaReducer';

// import fetchBukkaMenuReducer from '../views/bukka/reducers/fetchBukkaMenuReducer';

import manipulateCardDetailsReducer from '../views/checkout/reducers/manipulateCardDetailsReducer';

import chargeUserReducer from '../views/checkout/reducers/chargeUserReducer';

import finishTransactionReducer from '../views/checkout/reducers/finishTransactionReducer';
// import signOutReducer from '../components/navbar/reducers/signOutReducer';
// import searchAnythingReducer from './searchAnythingReducer';
import deliveryScheduleReducer from './deliveryScheduleReducer';
import cartReducer from './cartReducer';

import verifyCardReducer from '../views/checkout/reducers/verifyCardReducer';
import saveUserCardReducer from '../views/checkout/reducers/saveUserCardReducer';
import getUserCardReducer from '../views/checkout/reducers/getUserCardReducer';
import setDefaultCardReducer from '../views/checkout/reducers/setDefaultCardReducer';
import alertMessageReducer from './alertMessageReducer';

import sendContactReducer from '../views/verifyPhone/reducers/sendContactReducer';
import sendVerificationCodeReducer from '../views/verifyPhone/reducers/sendVerificationCodeReducer';

import getUserDataReducer from '../views/verifyPhone/reducers/getUserDataReducer';
// import promotionReducer from '../views/promotion/reducer/promotionReducer';
// import cuisineReducer from '../views/feed/reducers/cuisineReducer';

const reducer = combineReducers({
  loadingReducer,
  // authenticationReducer,
  // signOutReducer,
  // navbarAuthReducer,
  // deliveryModeReducer,
  // bukkasReducer,
  // fetchUserAddress,
  // fetchUserData,
  // postUserAddress,
  // postUserData,
  // displayTrackingReducer,
  // getOrderHistoryReducer,
  validateTokenReducer,
  requestPasswordChangesReducer,
  changePasswordReducer,
  // fetchBukkaMenuReducer,
  // fetchBukkaReducer,
  manipulateCardDetailsReducer,
  chargeUserReducer,
  finishTransactionReducer,
  checkoutModeReducer,
  // searchAnythingReducer,
  deliveryScheduleReducer,
  cartReducer,
  reportIssueReducer,
  sendContactReducer,
  sendVerificationCodeReducer,
  getUserDataReducer,
  saveUserCardReducer,
  verifyCardReducer,
  getUserCardReducer,
  setDefaultCardReducer,
  alertMessageReducer,
  // promotionReducer,
  // cuisineReducer,
});

let middleware = applyMiddleware(thunk, logger);

const persistConfig = {
  key: 'root',
  storage,
  whitelist: [
    // 'authenticationReducer',
    // 'fetchBukkaReducer',
    // 'fetchBukkaMenuReducer',
    // 'cuisineReducer',
    // 'promotionReducer',
    'deliveryScheduleReducer',
    'cartReducer',
  ]
};
const persistedReducer = persistReducer(persistConfig, reducer);

if (process.env.NODE_ENV === 'production') {
  middleware = applyMiddleware(thunk);
}

export default () => {
  const store = createStore(persistedReducer, middleware);
  const persistor = persistStore(store);
  return { store, persistor };
};
