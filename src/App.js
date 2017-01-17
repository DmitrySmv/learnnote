import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRedirect, browserHistory } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import store, { history } from './redux/store';
import Dropbox from './redux/services/Dropbox';
import App from './containers/App/App';
import LoginPage from './components/LoginPage/LoginPage';
import Dashboard from './components/Dashboard/Dashboard';
import Decks from './containers/Decks/Decks';
import { loadDecks } from './redux/reducers/decks';
import muiTheme from './muiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

export default () => (
  <MuiThemeProvider muiTheme={muiTheme}>
    <Provider store={store}>
      <Router history={history}>
        <Route path='/' component={App}>
          <IndexRedirect to='/login'/>
          <Route path='/login' component={LoginPage} onEnter={redirectToDashboardIfAuthorized}/>
          <Route path='/dashboard' component={Dashboard} onEnter={requireAuth}>
            <Route path='/dashboard/subjects/:subjectId' component={Decks} onEnter={loadDecksOnEnter}/>
          </Route>
        </Route>
      </Router>
    </Provider>
  </MuiThemeProvider>
);

function redirectToDashboardIfAuthorized() {
  if (isAuthorized()) {
    browserHistory.push('/dashboard');
  }
}

function requireAuth() {
  if (!isAuthorized()) {
    browserHistory.push('/login');
  }
}

function loadDecksOnEnter({params}) {
  const {subjectId} = params;
  store.dispatch(loadDecks(subjectId));
}

function isAuthorized() {
  return Boolean(Dropbox.getAccessToken());
}
