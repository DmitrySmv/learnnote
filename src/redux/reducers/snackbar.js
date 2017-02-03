import isObject from 'lodash.isobject';

// action types
const SET_SNACKBAR = 'SET_SNACKBAR';
const CLEAR_SNACKBAR = 'CLEAR_SNACKBAR';

const initialState = {
  message: ''
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_SNACKBAR:
      return action.payload;
    case CLEAR_SNACKBAR:
      return {...initialState};
    default:
      return state;
  }
}

// action creators
export function setSnackbar(message, autoHideDuration = 4000) {
  return (dispatch) => {
    if (isObject(message)) {
      message = JSON.stringify(message);
    }

    const action = {type: SET_SNACKBAR, payload: {message, autoHideDuration}};

    dispatch(action);

    setTimeout(() => dispatch(clearSnackbar()), autoHideDuration);
  };
}

export function clearSnackbar() {
  return {type: CLEAR_SNACKBAR};
}
