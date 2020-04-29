import createAction from './createAction';
import API from '../shared/api';

// &page=${page}&limit=${limit}&type=${type}
const setLngLt = (lglt) => `longitude=${lglt[0]}&lattitude=${lglt[1]}`;
const query = (lglt, type = 'food', limit = 12, page = 1) => `longitude=${lglt[0]}&lattitude=${lglt[1]}&page=${page}&limit=${limit}&type=${type}`

export default () => ({
  login: (data, loading, handleSucc, handleFail) => createAction('login', API.verify.post(data), loading, handleSucc, handleFail),
  register: (data, loading, handleSucc, handleFail) => createAction('login', API.register.post(data), loading, handleSucc, handleFail),
  businesses: (lgl, type, loading, handleSucc, handleFail) => createAction('businesses', API.businesses.getWithquery(query(lgl, type)), loading, handleSucc, handleFail),
  businessCategories: (lgl, loading, handleSucc, handleFail) => createAction('businessCategories', API.businessCategories.getWithquery(setLngLt(lgl)), loading, handleSucc, handleFail),
  businessGroup: (lgl, loading, handleSucc, handleFail) => createAction('bizGroup', API.businessGroup.getWithquery(setLngLt(lgl)), loading, handleSucc, handleFail),
});
