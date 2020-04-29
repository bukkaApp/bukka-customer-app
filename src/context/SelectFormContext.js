import { useEffect, useState, useReducer } from 'react';
import { SET_SELECT_FORM } from '../shared/actionTypes';
import constate from 'constate';
import logger from './Logger';

const initialState = {
  type: 'Sign In',
  path: '/signup',
};

const reducer = (originalState, action) => {
  const state = Object.assign({}, originalState);
  switch (action.type) {
    case SET_SELECT_FORM: {
      const isPath = action.payload.includes('/');
      const approvedForm = { '/login': "Sign In", '/signup': 'Sign Up'}
      const path = isPath ? action.payload : `/${action.payload.split(' ').join('')}`.toLowerCase();
      const type = isPath ? approvedForm[action.payload] : action.payload;
      return { ...state, type, path };
    }
     
      default: {
      return state;
    }
  }
};

const loggerReducer = logger(reducer);

const useSelectForm = () => {
  const [data, setData] = useState(initialState);
  const [state, dispatch] = useReducer(loggerReducer, data);

  useEffect(() => {
    setData(state);
  }, [state, setData]);

  const setSelectForm = (payload) => {
    dispatch({
      type: SET_SELECT_FORM,
      payload,
    });
  };

  const { type } = state;

  return { type, setSelectForm };
};

export const [SelectFormProvider, useSelectFormContext] = constate(useSelectForm);
