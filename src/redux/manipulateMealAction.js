import { MANIPULATE_MEAL } from '../redux/actionTypes';

const manipulateMealAction = manipulateType => dispatch => dispatch({
  type: MANIPULATE_MEAL,
  manipulateType,
});

export default manipulateMealAction;
