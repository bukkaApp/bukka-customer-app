import { useEffect, useReducer } from 'react';
import moment from 'moment';
import swal from 'sweetalert';
import constate from 'constate';
import logger from './Logger';
import { DEL_PRODUCT, UPDATE_CART, FETCH_CART } from "../shared/actionTypes";
import handleOrderQuantity from '../shared/handleOrderQuantity';
import { useLocalStorage } from '../shared/useLocalStorage';

const initialState = {
  cart: [],
  totalCost: 0,
  initialTime: 0,
  sub_menus: {
    productSlug: '',
    submenus: []
  },
  status: {
    updated: false,
    error: false,
  },
  errorMessage: '',
};

const reducer = (originalState, action) => {
  const state = Object.assign({}, originalState);
  switch (action.type) {
    case `${FETCH_CART}_SUCCESS`: {
      const { userCart } = action.data;
      return cartUpdateSuccess(userCart || { cart: [] }, state);
    }

    case `${FETCH_CART}_ERROR`: {
      const { message } = action.data;
      return cartUpdateError(state, message);
    }

    case `${UPDATE_CART}_SUCCESS`: {
      const { items } = action.data;
      return cartUpdateSuccess(items);
    }

    case `${UPDATE_CART}_LOCAL`: {
      const initialTime = state.initialTime;
      const currTime = moment(new Date());
      if (typeof initialTime !== 'number' && currTime.diff(initialTime) >= 43200000) {
        return {
          ...state,
          initialTime: 0,
          cart: [],
          item: {},
          totalCost: 0
        };
      }
      if (state.items.length > 0 && action.data.bukka !== state.items[0].bukka) {
        swal('your cart can only contain items of a single bukka at any given time');
        return {
          ...state,
          errorMessage: 'your cart can only contain items of a single bukka at any given time',
        };
      }
      const item = { ...action.data, meal: action.data, quantity: 1 };
      if (state.items.length > 0) {
        const incrementQuantity = handleOrderQuantity(state.items, item);
        if (incrementQuantity) {
          return createLocalCart(state, incrementQuantity);
        }
        const newItems = [...state.cart, item];
        return createLocalCart(state, newItems);
      }
      const newItems = [...state.items, item];
      return createLocalCart(state, newItems, currTime);
    }

    case DEL_PRODUCT: {
      const newItems = state.cart.filter((t, index) => index !== action.data.index);
      return {
        ...state,
        cart: newItems,
        totalCost: calculatePrice(newItems || []),
      };
    }

    case `${UPDATE_CART}_ERROR`: {
      const { message } = action.data;
      return cartUpdateError(state, message);
    }

    case 'FINISH_CHARGE_TRANSACTION_SUCCESS': {
      return {
        ...state,
        cart: [],
      };
    }

    default: {
      const initialTime = state.initialTime;
      const currTime = moment(new Date());
      if (typeof initialTime !== 'number' && currTime.diff(initialTime) >= 43200000) {
        return {
          ...state,
          initialTime: 0,
          cart: [],
          item: {},
          totalCost: 0
        };
      }
      return state;
    }
  }
};


const loggerReducer = logger(reducer);

const useCart = () => {
  const [data, setData] = useLocalStorage('cart', initialState);
  const [state, dispatch] = useReducer(loggerReducer, data);

  useEffect(() => {
    setData(state);
  }, [state, setData]);

  const delProduct = (payload) => {
    dispatch({
      type: DEL_PRODUCT,
      data: payload
    });
  };


  const { cart, totalCost, status: { updated, error }, errorMessage } = state;

  return { cart, updated, totalCost, error, errorMessage, delProduct };
};

export const [CartProvider, useCartContext] = constate(useCart);


const handleSubmenusPrice = (cartItems) => {
  let total = 0;
  cartItems.map(function n(eachItem) {
    if (eachItem.submenus.length > 0) {
      for (let i = 0; i < eachItem.submenus.length; i++) {
        for (let k = 0; k < eachItem.submenus[i].options.length; k++) {
          total += eachItem.submenus[i].options[k].price * eachItem.quantity;
        }
      }
    }
  });
  return total;
};

const calculatePrice = (cartItems) => {
  if (cartItems.length === 0) {
    return 0;
  }
  const add = (accumulator, digit) => accumulator + digit;
  const totalPrice = cartItems.map(item => item.price * item.quantity).reduce(add);
  return handleSubmenusPrice(cartItems) + totalPrice;
};

const createLocalCart = (state, newItems, newTime) => ({
  ...state,
  initialTime: newTime || state.initialTime,
  cart: newItems,
  totalCost: calculatePrice(newItems || []),
  errorMessage: '',
});

const cartUpdateSuccess = (userCart, state) => {
  const item = { ...userCart.cart, ...userCart.cart.meal[0] };
  const newCart = [...state.cart, item];
  return {
    cart: newCart,
    totalCost: calculatePrice(newCart),
    status: {
      updated: true,
      error: false
    },
    errorMessage: ''
  };
};

const cartUpdateError = (state, message) => ({
  ...state,
  status: {
    updated: false,
    error: true
  },
  errorMessage: message || 'an error occured'
});

// const updateTime = state => ({
//   ...state,
//   initialTime: typeof state.initialTime === 'number' ? moment(new Date()) : state.initialTime
// });
