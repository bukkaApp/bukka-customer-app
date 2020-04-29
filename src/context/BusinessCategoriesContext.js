/* eslint-disable max-len */
import { useEffect, useReducer } from 'react';
import { SET_BIZ_CATEGORIES, SET_MORE_BIZ_CATEGORIES } from '../shared/actionTypes';
import constate from 'constate';
import logger from './Logger';
import { useLocalStorage } from '../shared/useLocalStorage';

const initialState = {
  categories: [],
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
    case `${SET_BIZ_CATEGORIES}_SUCCESS`: {
      const { fetchedBukkas } = action.data;
      // newState object/data - avoid max-length
      const newState = { categories: fetchedBukkas, errorMessage: '' };
      return { ...state, ...newState, status: { fetched: true, error: false }, };
    }

    case `${SET_BIZ_CATEGORIES}_ERROR`: {
      const { message } = action.data;
      // pre-setState object/data - avoid max-length
      const newState = { categories: [], errorMessage: message };
      return { ...state, ...newState, status: { fetched: false, error: true }, };
    }

    case `${SET_MORE_BIZ_CATEGORIES}_SUCCESS`: {
      const { currentPage, fetchedCuisine: { category: categories } } = action.data;
      // newState object/data - avoid max-length
      const newState = { categories: [...state.categories, ...categories], currentPage, errorMessage: '' };
      return { ...state, ...newState, status: { fetched: true, error: false }, };
    }

    case `${SET_MORE_BIZ_CATEGORIES}_ERROR`: {
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

const useBusinessCategories = () => {
  const [data, setData] = useLocalStorage('bsc', initialState);
  const [state, dispatch] = useReducer(loggerReducer, data);

  useEffect(() => {
    setData(state);
  }, [state, setData]);

  const { categories, currentPage, status: { fetched, error }, errorMessage } = state;

  const setBizCategories = (payload) => {
    dispatch({
      type: `${SET_BIZ_CATEGORIES}_SUCCESS`,
      data: payload
    });
  };

  const setBizCategoriesError = (payload) => {
    dispatch({
      type: `${SET_BIZ_CATEGORIES}_ERROR`,
      data: payload
    });
  };

  const setMoreBizCategories = (payload) => {
    dispatch({
      type: `${SET_MORE_BIZ_CATEGORIES}_SUCCESS`,
      data: payload
    });
  };

  const setMoreBizCategoriesError = (payload) => {
    dispatch({
      type: `${SET_MORE_BIZ_CATEGORIES}_ERROR`,
      data: payload
    });
  };


  return { categories, currentPage, fetched, error, errorMessage, setBizCategories, setBizCategoriesError, setMoreBizCategories, setMoreBizCategoriesError };
};

export const [BusinessCategoriesProvider, useBusinessCategoriesContext] = constate(useBusinessCategories);
