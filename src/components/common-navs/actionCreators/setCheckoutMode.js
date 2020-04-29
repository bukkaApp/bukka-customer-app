import { SET_CHECKOUT_MODE } from '../../../redux/actionTypes';

const setCheckoutMode = mode => dispatch =>
  dispatch({ type: SET_CHECKOUT_MODE, mode });

export default setCheckoutMode;
