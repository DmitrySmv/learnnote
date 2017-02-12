import { browserHistory } from 'react-router';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { syncHistoryWithStore, routerMiddleware, push } from 'react-router-redux';
import Dropbox from './services/Dropbox';
import reducers from './reducers';
import { loadSubjects } from './reducers/subjects';

const service = getDropboxService();

const store = createStore(
  reducers,
  applyMiddleware(
    routerMiddleware(browserHistory),
    thunk.withExtraArgument(service)
  )
);

if (service) {
  service.onAuthError = function() {
    localStorage.clear();
    store.dispatch(push('/login'));
  }

  store.dispatch(loadSubjects())
    .then(() => {
      const {
        routing: {locationBeforeTransitions: {pathname}},
        subjects: {items: [subject]}
      } = store.getState();

      if (pathname !== '/dashboard' || !subject || !subject.id) {
        return;
      }

      store.dispatch(push(`/dashboard/subjects/${subject.id}`));
    });
}

export const history = syncHistoryWithStore(browserHistory, store);

function getDropboxService() {
  const accessToken = Dropbox.getAccessToken();

  if (!accessToken) {
    return;
  }

  return new Dropbox({accessToken});
}

export default store;
