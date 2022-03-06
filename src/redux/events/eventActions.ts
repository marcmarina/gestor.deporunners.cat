import http from 'services/http';

export const FETCH_EVENTS_BEGIN = 'FETCH_EVENTS_BEGIN';
export const FETCH_EVENTS_SUCCESS = 'FETCH_EVENTS_SUCCESS';
export const FETCH_EVENTS_FAILURE = 'FETCH_EVENTS_FAILURE';

export const fetchEventsBegin = () => ({
  type: FETCH_EVENTS_BEGIN,
});

export const fetchEventsSuccess = (events) => ({
  type: FETCH_EVENTS_SUCCESS,
  payload: { events },
});

export const fetchEventsFailure = (error) => ({
  type: FETCH_EVENTS_FAILURE,
  payload: { error },
});

export function fetchEvents() {
  return async (dispatch) => {
    dispatch(fetchEventsBegin());
    try {
      const res = await http.get('/event');
      dispatch(fetchEventsSuccess(res.data));
      return res.data;
    } catch (ex) {
      dispatch(fetchEventsFailure(ex));
    }
  };
}
