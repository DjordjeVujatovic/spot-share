import {
    FILTER_BOOKING_SPOT,
  } from './actions';

// intial state
const bookSpotListInitialState = {
  visibilityFilter: 'ALL',
};

// reducer
export default (state = bookSpotListInitialState, action) => {
  switch (action.type) {
    case FILTER_BOOKING_SPOT:
      return state;
    default:
      return state;
  }
};
