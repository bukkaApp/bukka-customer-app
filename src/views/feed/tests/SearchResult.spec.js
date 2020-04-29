import React from 'react';

import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import freeDelivery from '../data/free-delivery.json';
import bukkaData from '../data/search.json';
import SearchResult from 'src/components/SearchResult';

const initialState = {
  navbarAuthReducer: { type: 'Sign In', },
  deliveryModeReducer: { mode: 'delivery', },
  searchAnythingReducer: { search: '' },
  locationsPredictionReducer: { predictions: [3.7474, 3.4848] },
  authenticationReducer: {
    status: {
      authenticated: false,
      error: false
    }
  },
  bukkasReducer: {
    fetchedBukkas: {
      nearbyBukkas: [],
      message: ''
    },
    status: {
      fetchedBukkas: false,
      error: true,
    }
  },
  selectedLocationReducer: { coordinates: [3.7474, 3.4848] }
};

const store = mockStore(initialState);

describe.skip('SearchResult component', () => {
  const props = {
    signOut: jest.fn(),
    setDeliveryModeAction: jest.fn(),
    push: jest.fn(),
    coordinates: [3.7474, 3.4848],
    fetchedBukkas: { nearbyBukkas: [] },
    fetchNearbyBukkas: jest.fn(),
    status: { error: false },
    cuisineReducer: {
      cuisineItems: [],
      errorMessage: '',
      currentPage: 1,
      cuisineToDisplay: { name: '' },
    },
  };
  const { container, rerender } = render(
    <Provider store={store}>
      <MemoryRouter>
        <SearchResult {...props} />
      </MemoryRouter>
    </Provider>
  );

  it.skip('renders properly', () => {
    expect(container).toMatchSnapshot();
  });
  it.skip('renders properly', () => {
    const nearbyBukkas = [...freeDelivery, ...bukkaData];
    const newState = {
      ...initialState,
      searchAnythingReducer: { search: 'a' },
      bukkasReducer: {
        ...initialState.bukkasReducer,
        fetchedBukkas: {
          ...initialState.bukkasReducer.fetchedBukkas,
          nearbyBukkas,
          message: ''
        },
        status: {
          ...initialState.bukkasReducer.status,
          fetchedBukkas: true,
          error: false
        }
      }
    };
    const newProps = {
      ...props,
      fetchedBukkas: { nearbyBukkas },
    };
    const newStore = mockStore(newState);
    rerender(
      <Provider store={newStore}>
        <MemoryRouter>
          <SearchResult {...newProps} />
        </MemoryRouter>
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });
});
