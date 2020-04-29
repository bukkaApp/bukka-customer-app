import { SET_DELIVERY_SCHEDULE } from 'src/redux/actionTypes';

const setDeliverySchedule = ({ day, time }) => dispatch =>
  dispatch({ type: SET_DELIVERY_SCHEDULE, time, day });

export default setDeliverySchedule;
