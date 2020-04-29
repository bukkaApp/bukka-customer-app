import { GET_USER_DATA } from '../../../shared/actionTypes';
import AuthService from '../../../shared/authServices';
import loading from '../../../redux/loading';
import { axiosInstance } from '../../../shared/api';

const getUserAction = (type, data) => ({
  type: `${GET_USER_DATA}_${type}`,
  data,
});

const getUser = () => async (dispatch) => {
  try {
    dispatch(loading(GET_USER_DATA, true));
    const request = await axiosInstance({
      method: 'GET',
      url: '/user/profile',
      headers: {
        authorization: AuthService.getToken(),
        accept: 'application/json',
      },
    });
    dispatch(getUserAction('SUCCESS', request.data.userInfo));
    dispatch(loading(GET_USER_DATA, false));
  } catch (error) {
    dispatch(loading(GET_USER_DATA, false));
    dispatch(getUserAction('ERROR', error.response.data));
  }
};

export default getUser;
