import { REQUEST_PASSWORD_CHANGE } from '../../../redux/actionTypes';

import loading from '../../../redux/loading';

import axios from '../../../redux/axios';

const requestPassChangesAction = (type, data) => ({
  type: `${REQUEST_PASSWORD_CHANGE}_${type}`,
  data,
});

const requestPassChanges = (url, data) => async (dispatch) => {
  try {
    dispatch(loading(REQUEST_PASSWORD_CHANGE, true));
    const request = await axios.post(url, data);
    dispatch(requestPassChangesAction('SUCCESS', request.data));
    dispatch(loading(REQUEST_PASSWORD_CHANGE, false));
  } catch (error) {
    dispatch(loading(REQUEST_PASSWORD_CHANGE, false));
    dispatch(requestPassChangesAction('ERROR', error.response.data));
  }
};

export default requestPassChanges;
