import Dropbox from 'dropbox';
import readFileBlobAsText from '../../helpers/readFileBlobAsText';
import parseQueryString from '../../helpers/parseQueryString';

class DropboxService {
  static getAccessToken() {
    return this.getAccessTokenFromUrl() || this.getAccessTokenFromLocalStorage();
  }

  static getAccessTokenFromUrl() {
    const {access_token} = parseQueryString(window.location.hash);

    return access_token;
  }

  static getAccessTokenFromLocalStorage() {
    return localStorage.getItem('dropbox:accessToken');
  }

  static saveAccessTokenToLocalStorage(accessToken) {
    localStorage.setItem('dropbox:accessToken', accessToken);
  }

  constructor(options) {
    const {accessToken} = options;
    this._dropbox = new Dropbox({accessToken});
  }

  getSubjects() {
    return this._get('/subjects');
  }

  getDecks({subjectId}) {
    return this._get(`/subjects/${subjectId}/decks`);
  }

  createSubject(subject) {
    return this._createObject(subject, '/subjects');
  }

  createDeck(deck) {
    return this._createObject(deck, `/subjects/${deck.subjectId}/decks`);
  }

  deleteDeck(deck) {
    const path = `/subjects/${deck.subjectId}/decks/${deck.id}.json`;
    return this._dropbox.filesDelete({path});
  }

  _get(path) {
    return this._dropbox.filesListFolder({path})
      .then(response => {
        const {entries} = response || {};

        if (!entries) return;
        const files = entries.filter(item => item['.tag'] === 'file').map(item => item.path_lower);

        return Promise.all(files.map(path => {
          return this._dropbox.filesDownload({path})
              .then(res => readFileBlobAsText(res.fileBlob))
              .then(JSON.parse);
        }));
      })
      .catch(err => {
        if (err.status === 409) {
          return [];
        }
        if (err.status === 401) {
          this.onAuthError && this.onAuthError(err);
          return;
        }
        return err;
      });
  }

  _createObject(object, dir) {
    const contents = JSON.stringify(object);
    const path = `${dir}/${object.id}.json`;

    return this._dropbox.filesUpload({path, contents});
  }
}

export default DropboxService;
