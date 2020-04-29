import { UPDATE_SUBMENUS } from '../redux/actionTypes';

const manipulateSubmenusAction = ({ submenus, submenuId, submenuOptionId, mealSlug }) => dispatch => dispatch({
  type: UPDATE_SUBMENUS,
  data: {
    submenus, submenuId, submenuOptionId, mealSlug
  },
});

export default manipulateSubmenusAction;
