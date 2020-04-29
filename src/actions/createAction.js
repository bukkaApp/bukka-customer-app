import {
  LOGIN, SET_USER,
  SET_MORE_BIZ_CATEGORIES,
  SET_BIZ_CATEGORIES,
  SET_COMPANY,
  FETCH_BUSINESSES,
  SET_PRODUCTS,
  SET_MORE_PRODUCTS,
  FETCH_MORE_BUSINESSES,
  SET_BIZ_GROUP,
  SET_MORE_BIZ_GROUP
} from "../shared/actionTypes";

const constActions = {
  businesses: FETCH_BUSINESSES,
  businessCategories: SET_BIZ_CATEGORIES,
  bizGroup: SET_BIZ_GROUP,
  company: SET_COMPANY,
  login: LOGIN,
  profile: SET_USER,
  moreBizCategories: SET_MORE_BIZ_CATEGORIES,
  moreBiz: FETCH_MORE_BUSINESSES,
  moreProducts: SET_MORE_PRODUCTS,
  products: SET_PRODUCTS,
  moreBizGroup: SET_MORE_BIZ_GROUP,
}

const createAction = async (type, API, loading, successCallback, failureCallback) => {
  const load = type && !loading ? () => {} : loading;
  load(constActions[type], true);
  return await API
  .then((response) => {
    load(constActions[type], false);
    successCallback && successCallback(response.data);
  })
  .catch(err => {
    load(constActions[type], false);
    // if (!err.response) dispatch(alertMessage(FETCH_BUKKAS, true, 'Please check your network'));
    if(err.response) failureCallback && failureCallback(err.response.data);
  });
};

export default createAction;
