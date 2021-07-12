import http from 'services/http';

export const FETCH_MEMBERS_BEGIN = 'FETCH_MEMBERS_BEGIN';
export const FETCH_MEMBERS_SUCCESS = 'FETCH_MEMBERS_SUCCESS';
export const FETCH_MEMBERS_FAILURE = 'FETCH_MEMBERS_FAILURE';

export const fetchMembersBegin = () => ({
  type: FETCH_MEMBERS_BEGIN,
});

export const fetchMembersSuccess = members => ({
  type: FETCH_MEMBERS_SUCCESS,
  payload: { members },
});

export const fetchMembersFailure = error => ({
  type: FETCH_MEMBERS_FAILURE,
  payload: { error },
});

export function fetchMembers() {
  return async dispatch => {
    dispatch(fetchMembersBegin());

    try {
      const res = await http.get('/member');
      dispatch(fetchMembersSuccess(res.data));
      return res.data;
    } catch (ex) {
      dispatch(fetchMembersFailure(ex));
    }
  };
}
