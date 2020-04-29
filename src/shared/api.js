/* eslint-disable max-len */
import axios from 'axios';

// 'https://backendapi.mybukka.com/api/v1/'
const { NODE_ENV } = process.env;
const PORT = process.env.PORT || '1234';
const baseURL = NODE_ENV === 'production' ? 'https://mybukka-backend.herokuapp.com/api/v1/' : `http://localhost:${PORT}/api/v1/`; // eslint-disable-line

const axiosInstance = axios.create({
  baseURL,
  headers: {
    accept: 'application/json',
  }
});

const createEndpoint = endpoint => ({
  getWithquery: query => axiosInstance.get(`${endpoint}?${query || ''}`),
  get: id => axiosInstance.get(`${endpoint}/${id || ''}`),
  put: (id, data, config) => axiosInstance.put(`${endpoint}/${id || ''}/`, data, config),
  patch: (id, data, config) => axiosInstance.patch(`${endpoint}/${id || ''}/`, data, config),
  post: (data, config) => axiosInstance.post(`${endpoint}/`, data, config),
});

const API = {
  company: createEndpoint('bukka'),
  businesses: createEndpoint('bukka/nearby'),
  products: createEndpoint('menu'),
  businessCategories: createEndpoint('cuisine/items'),
  businessGroup: createEndpoint('place-group/items'),
  register: { post: data => axiosInstance.post('user/signup', data) },
  verify: { post: data => axiosInstance.post('user/signin', data) },
  // partners: createEndpoint('admin/partners'),
};

export { axiosInstance };
export default API;
