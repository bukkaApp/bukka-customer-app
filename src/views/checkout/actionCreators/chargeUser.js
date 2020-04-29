import axios from '../../../redux/axios';
import loading from '../../../redux/loading';
import { CHARGE_USER } from '../../../redux/actionTypes';

const chargeUserAction = (status, data) => ({
  type: `${CHARGE_USER}_${status}`,
  data
});

const chargeUser = data => async (dispatch) => {
  try {
    dispatch(loading(CHARGE_USER, true));
    const request = await axios({
      method: 'POST',
      url: '/pay/charge',
      data,
      headers: {
        authorization: localStorage.getItem('x-access-token'),
        accept: 'application/json'
      }
    });
    dispatch(chargeUserAction('SUCCESS', request.data));
    dispatch(loading(CHARGE_USER, false));
  } catch (error) {
    if (error.response) {
      dispatch(chargeUserAction('ERROR', error.response.data));
    }
    dispatch(loading(CHARGE_USER, false));
  }
};

export default chargeUser;
