import './LoginPage.css';
import Dropbox from 'dropbox';
import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';

const CLIENT_ID = '06vj6aigk8lb0zr';

class LoginPage extends Component {
  render() {
    return (<div>
      <h2>Learnnote uses Dropbox as default cloud storage.</h2>
      <RaisedButton
        label='Log in with Dropbox'
        primary={true}
        href={getAuthenticationUrl()}
        className='dropbox-button'
      />
    </div>);
  }
}

function getAuthenticationUrl() {
  const dbx = new Dropbox({ clientId: CLIENT_ID });
  return dbx.getAuthenticationUrl('http://localhost:3000/login');
}

export default LoginPage;
