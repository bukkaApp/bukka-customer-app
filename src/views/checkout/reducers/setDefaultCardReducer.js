import { SET_DEFAULT_CARD } from '../../../redux/actionTypes';

const initialState = {
  message: '',
  defaultCard: {},
  errorMessage: '',
  status: {
    success: false,
    error: false,
  }
};

const setDefaultCardReducer = (state = initialState, action) => {
  switch (action.type) {
    case `${SET_DEFAULT_CARD}_SUCCESS`: {
      return {
        ...state,
        defaultCard: action.data.defaultCard,
        message: action.data.message,
        errorMessage: '',
        status: {
          success: true,
          error: false,
        }
      };
    }

    case `${SET_DEFAULT_CARD}_ERROR`: {
      return {
        ...state,
        errorMessage: action.data.message,
        status: {
          success: false,
          error: true,
        }
      };
    }

    default: {
      return state;
    }
  }
};

export default setDefaultCardReducer;

