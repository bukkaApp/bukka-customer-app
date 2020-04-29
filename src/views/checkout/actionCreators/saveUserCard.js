import axios from '../../../redux/axios';
import loading from '../../../redux/loading';

import { SAVE_USER_CARD } from '../../../redux/actionTypes';

const saveUserCardAction = (status, data) => ({
  type: `${SAVE_USER_CARD}_${status}`,
  data
});

const saveUserCard = data => async (dispatch) => {
  try {
    dispatch(loading(SAVE_USER_CARD, true));
    const request = await axios({
      method: 'POST',
      url: '/card',
      data,
      headers: {
        authorization: localStorage.getItem('x-access-token'),
        accept: 'application/json'
      }
    });
    dispatch(saveUserCardAction('SUCCESS', request.data));
    dispatch(loading(SAVE_USER_CARD, false));
  } catch (error) {
    dispatch(loading(SAVE_USER_CARD, false));
    dispatch(saveUserCardAction('ERROR', error.response.data));
  }
};

export default saveUserCard;
