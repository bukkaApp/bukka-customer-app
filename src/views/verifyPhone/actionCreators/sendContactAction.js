import { SEND_CONTACT } from '../../../shared/actionTypes';
import AuthService from '../../../shared/authServices';
import loading from '../../../redux/loading';
import { axiosInstance } from '../../../shared/api';
import swal from 'sweetalert';

const sendContactAction = (type, data) => ({
  type: `${SEND_CONTACT}_${type}`,
  data,
});

const sendContact = (data, callback) => async (dispatch) => {
  try {
    dispatch(loading(SEND_CONTACT, true));
    const request = await axiosInstance({
      method: 'POST',
      url: '/user/send-code',
      data,
      headers: {
        authorization: AuthService.getToken(),
        accept: 'application/json',
      },
    });
    dispatch(sendContactAction('SUCCESS', request.data));
    dispatch(loading(SEND_CONTACT, false));
    callback();
  } catch (error) {
    dispatch(loading(SEND_CONTACT, false));
    dispatch(sendContactAction('ERROR', error.response.data));
    swal({
      title: 'Error',
      text: error.response.data.message,
      dangerMode: true
    });
  }
};

export default sendContact;
