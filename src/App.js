import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Provider } from 'react-redux';
import { Router, Route, IndexRedirect, browserHistory } from 'react-router';
import store, { history } from './redux/store';
import { loadDecks } from './redux/reducers/decks';
import Dropbox from './redux/services/Dropbox';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';
import App from './containers/App';
import Decks from './containers/Decks';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import muiTheme from './muiTheme';

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
