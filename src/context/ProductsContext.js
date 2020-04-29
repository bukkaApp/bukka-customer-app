/* eslint-disable max-len */
import { useEffect, useReducer, useCallback } from 'react';
import { SET_PRODUCTS, SET_MORE_PRODUCTS } from '../shared/actionTypes';
import constate from 'constate';
import logger from './Logger';
import { useLocalStorage } from '../shared/useLocalStorage';
import { useLoadingContext } from './UseLoading';
import API from '../shared/api';

const initialState = {
  products: [],
  productCategories: [],
  productCatalog: {}, // product to display on modal
  errorMessage: '',
  status: {
    fetched: false,
    error: false,
  }
};

const reducer = (originalState, action) => {
  const state = Object.assign({}, originalState);
  switch (action.type) {
    case `${SET_PRODUCTS}_SUCCESS`: {
      const { bukkaMenu } = action.data;
      // newState object/data - avoid max-length
      const newState = { products: bukkaMenu, productCategories: [...new Set(bukkaMenu.map(mealData => mealData.category))], errorMessage: '' };
      return { ...state, ...newState, status: { fetched: true, error: false }, };
    }

    case `${SET_PRODUCTS}_ERROR`: {
      const { message } = action.data;
      // pre-setState object/data - avoid max-length
      const newState = { products: [], errorMessage: message };
      return { ...state, ...newState, status: { fetched: false, error: true }, };
    }

    case `${SET_MORE_PRODUCTS}_SUCCESS`: {
      const { currentPage, nearByBukkas } = action.data;
      // newState object/data - avoid max-length
      const newState = { products: [...state.products, ...nearByBukkas], currentPage, errorMessage: '' };
      return { ...state, ...newState, status: { fetched: true, error: false }, };
    }

    case `${SET_MORE_PRODUCTS}_ERROR`: {
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

const useProducts = () => {
  const { loading } = useLoadingContext();
  const [data, setData] = useLocalStorage('pdt', initialState);
  const [state, dispatch] = useReducer(loggerReducer, data);

  useEffect(() => {
    setData(state);
  }, [state, setData]);

  const { products, productCatalog, productCategories, currentPage, status: { fetched, error }, errorMessage } = state;

  const setProducts = (payload) => {
    dispatch({
      type: `${SET_PRODUCTS}_SUCCESSS`,
      data: payload
    });
  };

  const setProductsError = (payload) => {
    dispatch({
      type: `${SET_PRODUCTS}_ERROR`,
      data: payload
    });
  };

  const setMoreProducts = (payload) => {
    dispatch({
      type: `${SET_MORE_PRODUCTS}_SUCCESSS`,
      data: payload
    });
  };

  const setMoreProductsError = (payload) => {
    dispatch({
      type: `${SET_MORE_PRODUCTS}_ERROR`,
      data: payload
    });
  };

  const fetchProducts = useCallback(async (businessID, type = 'food') => {
    try {
      loading(SET_PRODUCTS, true);
      const request = await API.products.get(`${businessID}?type=${type}`);
      loading(SET_PRODUCTS, false);
      setProducts(request.data);
    } catch (err) {
      loading(SET_PRODUCTS, false);
      // if (error.response.data.message === 'no menu for bukka')
      //   const errMsg = 'This company has no products';
      // if (!err.response) dispatch(alertMessage(FETCH_BUKKAS, true, 'Please check your network'));
      setProductsError(err.response.data);
    }
  }, [loading]);

  return { products, productCatalog, productCategories, currentPage, fetched, error, errorMessage, fetchProducts, setProducts, setProductsError, setMoreProducts, setMoreProductsError };
};

export const [ProductsProvider, useProductsContext] = constate(useProducts);
