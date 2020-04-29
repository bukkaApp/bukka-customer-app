import { useEffect, useReducer, useState } from 'react'
import { SET_SEARCH, CLEAR_SEARCH } from '../shared/actionTypes';
import constate from 'constate'
import logger from './Logger';

const initialState = {
  input: '',
};

const reducer = (state, action) => {

  switch (action.type) {
    case SET_SEARCH:
      return { ...state, input: action.data };

    case CLEAR_SEARCH:
      return { ...state, ainout: '' };

    default:
      return state;
  }
};

const loggerReducer = logger(reducer);

const useSearch = () => {
  const [data, setData] = useState(initialState);
  const [state, dispatch] = useReducer(loggerReducer, data);

  useEffect(() => {
    setData(state);
  }, [state, setData]);

  const { input } = state;

  const setSearch = (payload) => {
    dispatch({
      type: SET_SEARCH,
      data: payload
    })
  };

  const clearSearch = () => {
    dispatch({
      type: CLEAR_SEARCH
    })
  };


  return { input, setSearch, clearSearch }
};

export const [SearchProvider, useSearchContext] = constate(useSearch);
