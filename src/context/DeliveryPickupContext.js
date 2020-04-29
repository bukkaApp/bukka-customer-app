import { useEffect, useState, useReducer } from 'react';
import { SET_DELIVERY_PICKUP_MODE } from '../shared/actionTypes';
import constate from 'constate';
import logger from './Logger';

const initialState = {
  mode: 'delivery',
  isDelivery: true,
};

const reducer = (originalState, action) => {
  const state = Object.assign({}, originalState);
  switch (action.type) {
    case SET_DELIVERY_PICKUP_MODE:
      return { ...state, mode: action.payload, isDelivery: action.payload.toLowerCase() !== 'pickup' };

    default: {
      return state;
    }
  }
};

const loggerReducer = logger(reducer);

const useDeliveryPickupMode = () => {
  const [data, setData] = useState(initialState);
  const [state, dispatch] = useReducer(loggerReducer, data);

  useEffect(() => {
    setData(state);
  }, [state, setData]);

  const setDeliveryPickupMode = (payload) => {
    dispatch({
      type: SET_DELIVERY_PICKUP_MODE,
      payload,
    });
  };

  const { mode, isDelivery } = state;

  return { mode, isDelivery, setDeliveryPickupMode };
};

export const [DeliveryPickupModeProvider, useDeliveryPickupModeContext] = constate(useDeliveryPickupMode);
