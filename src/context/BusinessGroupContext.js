/* eslint-disable max-len */
import { useEffect, useReducer } from 'react';
import { SET_BIZ_GROUP, SET_MORE_BIZ_GROUP } from '../shared/actionTypes';
import constate from 'constate';
import logger from './Logger';
import { useLocalStorage } from '../shared/useLocalStorage';

const initialState = {
  businessGroups: [],
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
    case `${SET_BIZ_GROUP}_SUCCESS`: {
      const { fetchedBukkas } = action.data;
      // newState object/data - avoid max-length
      const newState = { businessGroups: fetchedBukkas, errorMessage: '' };
      return { ...state, ...newState, status: { fetched: true, error: false }, };
    }

    case `${SET_BIZ_GROUP}_ERROR`: {
      const { message } = action.data;
      // pre-setState object/data - avoid max-length
      const newState = { businessGroups: [], errorMessage: message };
      return { ...state, ...newState, status: { fetched: false, error: true }, };
    }

    case `${SET_MORE_BIZ_GROUP}_SUCCESS`: {
      const { currentPage, fetchedPromotion: { category: businessGroups } } = action.data;
      // newState object/data - avoid max-length
      const newState = { businessGroups: [...state.businessGroups, ...businessGroups], currentPage, errorMessage: '' };
      return { ...state, ...newState, status: { fetched: true, error: false }, };
    }

    case `${SET_MORE_BIZ_GROUP}_ERROR`: {
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
  const [data, setData] = useLocalStorage('bsg', initialState);
  const [state, dispatch] = useReducer(loggerReducer, data);

  useEffect(() => {
    setData(state);
  }, [state, setData]);

  const { businessGroups, currentPage, status: { fetched, error }, errorMessage } = state;

  const setBizGroup = (payload) => {
    dispatch({
      type: `${SET_BIZ_GROUP}_SUCCESS`,
      data: payload
    });
  };

  const setBizGroupError = (payload) => {
    dispatch({
      type: `${SET_BIZ_GROUP}_ERROR`,
      data: payload
    });
  };

  const setMoreBizCategories = (payload) => {
    dispatch({
      type: `${SET_MORE_BIZ_GROUP}_SUCCESS`,
      data: payload
    });
  };

  const setMoreBizCategoriesError = (payload) => {
    dispatch({
      type: `${SET_MORE_BIZ_GROUP}_ERROR`,
      data: payload
    });
  };

  return { businessGroups, currentPage, fetched, error, errorMessage, setBizGroup, setBizGroupError, setMoreBizCategories, setMoreBizCategoriesError };
};

export const [BusinessGroupProvider, useBusinessGroupContext] = constate(useBusinesses);
