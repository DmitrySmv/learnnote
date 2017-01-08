import { combineReducers } from 'redux';

// action types
const OPEN_CREATE_SUBJECT_DIALOG = 'OPEN_CREATE_SUBJECT_DIALOG';
const CLOSE_CREATE_SUBJECT_DIALOG = 'CLOSE_CREATE_SUBJECT_DIALOG';
const OPEN_CREATE_DECK_DIALOG = 'OPEN_CREATE_DECK_DIALOG';
const CLOSE_CREATE_DECK_DIALOG = 'CLOSE_CREATE_DECK_DIALOG';

export default combineReducers({
  createSubject: createSubjectDialogReducer,
  createDeck: createDeckDialogReducer
})

function createSubjectDialogReducer(state = {open: false}, action) {
  switch (action.type) {
    case OPEN_CREATE_SUBJECT_DIALOG:
      return {open: true};
    case CLOSE_CREATE_SUBJECT_DIALOG:
      return {open: false};
    default:
      return state;
  }
}

function createDeckDialogReducer(state = {open: false}, action) {
  switch (action.type) {
    case OPEN_CREATE_DECK_DIALOG:
      return {open: true};
    case CLOSE_CREATE_DECK_DIALOG:
      return {open: false};
    default:
      return state;
  }
}

// action creators
export function openCreateSubjectDialog() {
  return {type: OPEN_CREATE_SUBJECT_DIALOG};
}

export function closeCreateSubjectDialog() {
  return {type: CLOSE_CREATE_SUBJECT_DIALOG};
}

export function openCreateDeckDialog() {
  return {type: OPEN_CREATE_DECK_DIALOG};
}

export function closeCreateDeckDialog() {
  return {type: CLOSE_CREATE_DECK_DIALOG};
}
