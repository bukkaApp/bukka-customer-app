import { CHANGE_PASSWORD } from '../../../redux/actionTypes';

import loading from '../../../redux/loading';

import axios from '../../../redux/axios';

const changePasswordAction = (type, data) => ({
  type: `${CHANGE_PASSWORD}_${type}`,
  data,
});

const changePassword = (url, data, token) => async (dispatch) => {
  try {
    dispatch(loading(CHANGE_PASSWORD, true));
    const request = await axios({
      method: 'PUT',
      url,
      data,
      headers: {
        authorization: token,
        accept: 'application/json'
      }
    });
    dispatch(changePasswordAction('SUCCESS', request.data));
    dispatch(loading(CHANGE_PASSWORD, false));
  } catch (error) {
    dispatch(loading(CHANGE_PASSWORD, false));
    dispatch(changePasswordAction('ERROR', error.response.data));
  }
};

export default changePassword;
