import { combineReducers } from 'redux';
import { setSnackbar } from './snackbar';
import { LOADING, LOADED } from '../statuses';
import uuid from 'uuid';

// action types
const SET_SUBJECTS = 'SET_SUBJECTS';
const LOAD_SUBJECTS = 'LOAD_SUBJECTS';
const ADD_SUBJECT = 'ADD_SUBJECT';
const DELETE_SUBJECT = 'DELETE_SUBJECT';
const SET_SUBJECTS_STATUS = 'SET_SUBJECTS_STATUS';

export default combineReducers({
  items: subjectsReducer,
  status: statusReducer
})

function statusReducer(state = LOADED, action) {
  switch (action.type) {
    case SET_SUBJECTS:
      return LOADED;
    case LOAD_SUBJECTS:
      return LOADING;
    case SET_SUBJECTS_STATUS:
      return action.payload;
    default:
      return state;
  }
}

function subjectsReducer(state = [], action) {
  switch (action.type) {
    case SET_SUBJECTS:
      return action.payload;
    case ADD_SUBJECT:
      return [...state, action.payload];
    case DELETE_SUBJECT:
      return state.filter(subject => subject.id !== action.payload);
    case LOAD_SUBJECTS:
      return [];
    default:
      return state;
  }
}

// action creators
export function addSubject(subject) {
  return {type: ADD_SUBJECT, payload: subject};
}

export function setSubjects(subjects) {
  return {type: SET_SUBJECTS, payload: subjects};
}

export function setSubjectsStatus(status) {
  return {type: SET_SUBJECTS_STATUS, payload: status};
}

export function loadSubjects() {
  return (dispatch, getState, service) => {
    if (!service) return;

    dispatch({type: LOAD_SUBJECTS});

    return service.getSubjects()
      .then(subjects => dispatch(setSubjects(subjects)));
  }
}

export function createSubject(subject) {
  return (dispatch, getState, service) => {
    subject = {...subject, id: uuid()};
    dispatch(addSubject(subject));

    return service.createSubject(subject)
      .then(() => dispatch(setSnackbar(`Subject '${subject.name}' created`)))
      .catch(err => dispatch(setSnackbar(err)));
  };
}

export function deleteSubject(subject) {
  return (dispatch, getState, service) => {
    dispatch({type: DELETE_SUBJECT, payload: subject.id});

    return service.deleteSubject(subject)
      .then(response => dispatch(setSnackbar(`Subject '${subject.name}' deleted`)))
      .catch(err => dispatch(setSnackbar(err)));
  };
}
