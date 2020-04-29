import { FETCH_BUKKA } from '../redux/actionTypes';

import loading from 'src/redux/loading';
import axios from 'src/redux/axios';

const fetchFreshOrMart = (type, data) => ({
  type: `${FETCH_BUKKA}_${type}`,
  data,
});

const fetchFreshOrMartAction = (coordinates, type) => async (dispatch) => {
  try {
    dispatch(loading(FETCH_BUKKA, true));
    const request = await axios.get(`/bukka/nearby?longitude=${coordinates[0]}&lattitude=${coordinates[1]}&type=${type}`);
    dispatch(loading(FETCH_BUKKA, false));
    const { fetchedBukka } = request.data;
    dispatch(fetchFreshOrMart('SUCCESS', request.data));
    dispatch({ type: 'FETCH_BUKKA_SUCCESS', data: { fetchedBukka } });
  } catch (error) {
    dispatch(loading(FETCH_BUKKA, false));
    dispatch(fetchFreshOrMart('ERROR', error.response.data));
  }
};

export default fetchFreshOrMartAction;
