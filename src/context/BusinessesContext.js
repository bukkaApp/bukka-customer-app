/* eslint-disable max-len */
import { useEffect, useReducer } from 'react';
import { FETCH_BUSINESSES, FETCH_MORE_BUSINESSES } from '../shared/actionTypes';
import constate from 'constate';
import logger from './Logger';
import { useLocalStorage } from '../shared/useLocalStorage';

const initialState = {
  businesses: [],
  currentPage: 1,
  errorMessage: '',
  status: {
    fetched: false,
    error: false,
  }
};

const reducer = (originalState, action) => {
  const state = Object.assign({}, originalState);
  switch (action.type) {
    case `${FETCH_BUSINESSES}_SUCCESS`: {
      const { nearByBukkas } = action.data;
      // newState object/data - avoid max-length
      const newState = { businesses: nearByBukkas, errorMessage: '' };
      return { ...state, ...newState, status: { fetched: true, error: false }, };
    }

    case `${FETCH_BUSINESSES}_ERROR`: {
      const { message } = action.data;
      // pre-setState object/data - avoid max-length
      const newState = { businesses: [], errorMessage: message };
      return { ...state, ...newState, status: { fetched: false, error: true }, };
    }

    case `${FETCH_MORE_BUSINESSES}_SUCCESS`: {
      const { currentPage, nearByBukkas } = action.data;
      // newState object/data - avoid max-length
      const newState = { businesses: [...state.businesses, ...nearByBukkas], currentPage, errorMessage: '' };
      return { ...state, ...newState, status: { fetched: true, error: false }, };
    }

    case `${FETCH_MORE_BUSINESSES}_ERROR`: {
      const { message } = action.data;
      // pre-setState object/data - avoid max-length
      const newState = { errorMessage: message };
      return { ...state, ...newState, status: { fetched: false, error: true }, };
    }

    default:
      return state;
  }
};

const loggerReducer = logger(reducer);

const useBusinesses = () => {
  const [data, setData] = useLocalStorage('bs', initialState);
  const [state, dispatch] = useReducer(loggerReducer, data);

  useEffect(() => {
    setData(state);
  }, [state, setData]);

  const { businesses, currentPage, status: { fetched, error }, errorMessage } = state;

  const setBusinesses = (payload) => {
    dispatch({
      type: `${FETCH_BUSINESSES}_SUCCESS`,
      data: payload
    });
  };

  const setBusinessesError = (payload) => {
    dispatch({
      type: `${FETCH_BUSINESSES}_ERROR`,
      data: payload
    });
  };

  const setMoreBusinesses = (payload) => {
    dispatch({
      type: `${FETCH_MORE_BUSINESSES}_SUCCESS`,
      data: payload
    });
  };

  const setMoreBusinessesError = (payload) => {
    dispatch({
      type: `${FETCH_MORE_BUSINESSES}_ERROR`,
      data: payload
    });
  };

  return { businesses, currentPage, fetched, error, errorMessage, setBusinesses, setBusinessesError, setMoreBusinesses, setMoreBusinessesError };
};

export const [BusinessesProvider, useBusinessesContext] = constate(useBusinesses);
