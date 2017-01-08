import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import subjects from './subjects';
import dropbox from './dropbox';
import dialogs from './dialogs';
import snackbar from './snackbar';
import decks from './decks';

export default combineReducers({
  decks,
  dialogs,
  dropbox,
  snackbar,
  subjects,
  routing
});
