import { HIDE_LOADER } from '../redux/actionTypes';

import loading from 'src/redux/loading';

const hideLoadingAction = () => dispatch => dispatch(loading(HIDE_LOADER, false));

export default hideLoadingAction;
