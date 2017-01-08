import uuid from 'uuid';
import { setSnackbar } from './snackbar';
import { combineReducers } from 'redux';
import { LOADING, LOADED } from '../statuses';

// action types
const SET_DECKS = 'SET_DECKS';
const LOAD_DECKS = 'LOAD_DECKS';
const ADD_DECK = 'ADD_DECK';
const SET_DECKS_STATUS = 'SET_DECKS_STATUS';

export default combineReducers({
  items: decksReducer,
  status: statusReducer
})

function decksReducer(state = [], action) {
  switch (action.type) {
    case SET_DECKS:
      return action.payload;
    case ADD_DECK:
      return [...state, action.payload];
    case LOAD_DECKS:
      return [];
    default:
      return state;
  }
}

export function statusReducer(state = LOADED, action) {
  switch (action.type) {
    case SET_DECKS:
      return LOADED;
    case LOAD_DECKS:
      return LOADING;
    case SET_DECKS_STATUS:
      return action.payload;
    default:
      return state;
  }
}

// action creators
export function addDeck(subject) {
  return {type: ADD_DECK, payload: subject};
}

export function setDecks(subjects) {
  return {type: SET_DECKS, payload: subjects};
}

export function setDecksStatus(status) {
  return {type: SET_DECKS_STATUS, payload: status};
}

export function loadDecks(subjectId) {
  return (dispatch, getState, service) => {
    if (!service) return;

    dispatch({type: LOAD_DECKS});

    return service.getDecks({subjectId})
      .then(decks => dispatch(setDecks(decks)));
  };
}

export function createDeck(deck) {
  return (dispatch, getState, service) => {
    deck = {id: uuid(), ...deck};
    dispatch(addDeck(deck));

    return service.createDeck(deck)
      .then(() => dispatch(setSnackbar(`Deck '${deck.name}' created`)))
      .catch(err => dispatch(setSnackbar(err)));
  };
}
