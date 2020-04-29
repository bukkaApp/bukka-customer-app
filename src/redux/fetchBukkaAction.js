import { FETCH_BUKKA } from '../redux/actionTypes';

import loading from 'src/redux/loading';
import axios from 'src/redux/axios';

const fetchBukka = (type, data) => ({
  type: `${FETCH_BUKKA}_${type}`,
  data,
});

const fetchBukkaAction = bukka => async (dispatch) => {
  try {
    dispatch(loading(FETCH_BUKKA, true));
    const request = await axios.get(`/bukka/${bukka}`);
    dispatch(loading(FETCH_BUKKA, false));
    dispatch(fetchBukka('SUCCESS', request.data));
  } catch (error) {
    dispatch(loading(FETCH_BUKKA, false));
    dispatch(fetchBukka('ERROR', error.response.data));
  }
};

export default fetchBukkaAction;
