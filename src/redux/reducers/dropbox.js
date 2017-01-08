import Dropbox from '../services/Dropbox';

// action types
const SET_ACCESS_TOKEN = 'SET_ACCESS_TOKEN';

export default function reducer(state = getInitialState(), action) {
  switch (action.type) {
    case SET_ACCESS_TOKEN:
      return {...state, accessToken: action.payload};
    default:
      return state;
  }
}

// action creators
export function addAccessToken(token) {
  return {type: SET_ACCESS_TOKEN, payload: token};
}

function getInitialState() {
  const state = {};
  const accessToken = Dropbox.getAccessToken();

  if (accessToken) {
    Dropbox.saveAccessTokenToLocalStorage(accessToken);
    state.accessToken = accessToken;
  }

  return state;
}
