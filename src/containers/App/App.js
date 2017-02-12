import './App.css';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AppBar, Snackbar } from 'material-ui';

class App extends Component {
  render() {
    return (
      <div className='row'>
        <AppBar title='Learnnote' />
        {this.props.children}
        {this.props.snackbar.message && <Snackbar
          open={true}
          message={this.props.snackbar.message}
          autoHideDuration={this.props.snackbar.autoHideDuration}
        />}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const {dropbox, snackbar} = state;

  return {
    needDropboxLinking: Boolean(!dropbox || !dropbox.accessToken),
    snackbar
  };
}

export default connect(mapStateToProps)(App);
