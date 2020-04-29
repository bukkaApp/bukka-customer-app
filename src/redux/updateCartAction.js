import { axiosInstance } from '../shared/api';

import { UPDATE_CART } from '../redux/actionTypes';

const updateCart = (data, status) => ({
  type: `${UPDATE_CART}_${status}`,
  data,
});

const updateCartAction = (updatedCart, updateLocally, submenus) => async (dispatch) => {
  try {
    const token = localStorage.getItem('x-access-token');
    if (!token || updateLocally) return dispatch(updateCart(updatedCart, 'LOCAL'));
    const request = await axiosInstance({
      url: '/cart',
      method: 'PUT',
      data: updatedCart,
      headers: {
        Authorization: token,
        accept: 'application/json',
      }
    });
    dispatch(updateCart(request.data, 'SUCCESS'));
  } catch (error) {
    if (error.response) {
      dispatch(updateCart(error.response, 'ERROR'));
    }
    dispatch(updateCart(error, 'ERROR'));
  }
};

export default updateCartAction;
