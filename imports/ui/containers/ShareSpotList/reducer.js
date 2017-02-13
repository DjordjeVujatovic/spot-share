import {
    EDIT_PARKING_SPOT,
  } from './actions';

// intial state
const shareSpotsInitialState = {
  visibilityFilter: 'ALL',
};

// reducer
export default (state = shareSpotsInitialState, action) => {
  switch (action.type) {
    case EDIT_PARKING_SPOT:
      console.log(action.payload);
      return state;
    default:
      return state;
  }
};
