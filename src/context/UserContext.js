import { useEffect, useReducer } from 'react'
import { SET_USER, SET_VERIFIED, LOGIN, LOGOUT_SUCCESSFUL } from '../shared/actionTypes';
import constate from 'constate'
import logger from './Logger'
import useLocalStorage from '../shared/useLocalStorage';

const initialState = {
  token: '',
  isAuthenticated: null,
  isVerified: false,
  user: null,
  errorMessage: ''
};

const reducer = (state, action) => {

  switch (action.type) {
    case SET_USER:
      return {...state, user: {...state.user, ...action.payload.user }, errorMessage: '', token: action.data.token, isAuthenticated: true};

    case SET_VERIFIED:
    case `${LOGIN}_SUCCESSFUL`:
      return {...state, ...action.data, isAuthenticated: true, errorMessage: ''};

    case `${LOGIN}_ERROR`:
      return {...state, token: null, user: null, errorMessage: action.data.message, isAuthenticated: false};

    case LOGOUT_SUCCESSFUL:
      return {...state, token: null, user: null,
        isAuthenticated: false};

    default:
      return state;
  }
};

const loggerReducer = logger(reducer);

const useUser = () => {
  // const { loading } = useLoadingContext();
  const [data, setData] = useLocalStorage('user', initialState);
  const [state, dispatch] = useReducer(loggerReducer, data);

  useEffect(() => {
    setData(state);
  }, [state, setData]);

  const { user, token, errorMessage, isAuthenticated, isVerified } = state;

  const setUser = (user, token) => {
    dispatch({
      type: SET_USER,
      payload: { user },
      data: { token }
    })
  };

  const setVerified = (isVerified) => {
    dispatch({
      type: SET_VERIFIED,
      data: { isVerified }
    })
  };

  const loginSuccess = (token) => {
    dispatch({
      type: `${LOGIN}_SUCCESSFUL`,
      data: { token }
    })
  };

  const loginError = (payload) => {
    dispatch({
      type: `${LOGIN}_ERROR`,
      data: payload
    })
  };

  const logoutSuccess = () => {
    dispatch({
      type: LOGOUT_SUCCESSFUL,
    })
  };

  return { user, token, errorMessage, isAuthenticated, isVerified, setUser, loginSuccess, loginError, logoutSuccess, setVerified }
};

export const [UserProvider, useUserContext] = constate(useUser);
