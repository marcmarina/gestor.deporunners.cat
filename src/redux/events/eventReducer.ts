import {
  FETCH_EVENTS_BEGIN,
  FETCH_EVENTS_SUCCESS,
  FETCH_EVENTS_FAILURE,
} from './eventActions';

const initialState = {
  items: [],
  loading: false,
  error: null,
};

export default function member(state = initialState, action) {
  switch (action.type) {
    case FETCH_EVENTS_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case FETCH_EVENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.payload.events,
      };

    case FETCH_EVENTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        items: [],
      };

    default:
      return state;
  }
}
