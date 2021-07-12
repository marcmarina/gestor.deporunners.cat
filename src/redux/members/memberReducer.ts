import {
  FETCH_MEMBERS_BEGIN,
  FETCH_MEMBERS_SUCCESS,
  FETCH_MEMBERS_FAILURE,
} from './memberActions';

const initialState = {
  items: [],
  loading: false,
  error: null,
};

export default function member(state = initialState, action) {
  switch (action.type) {
    case FETCH_MEMBERS_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case FETCH_MEMBERS_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.payload.members,
      };

    case FETCH_MEMBERS_FAILURE:
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
