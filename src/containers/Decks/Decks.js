import React, { Component } from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import { openCreateDeckDialog } from '../../redux/reducers/dialogs';
import CreateDeckDialog from '../../containers/CreateDeckDialog/CreateDeckDialog';
import { LOADING } from '../../redux/statuses';
import CircularProgress from 'material-ui/CircularProgress';

const paperStyle = {
  width: '100%'
};

const createDeckButtonStyle = {
  marginTop: 26
};

class Decks extends Component {
  openDialog = () => {
    this.props.dispatch(openCreateDeckDialog());
  };

  render() {
    const {decks, params: {subjectId}, load} = this.props;


    return (<div>
      <div className='row'>
        <h1 className='float-left'>Decks</h1>
        <RaisedButton label='&#43; Create Deck' className='float-right' primary={true} style={createDeckButtonStyle} onClick={this.openDialog}/>
      </div>
      {load ?
        <div className='row'>
          <div className='large-6 columns'>
            <CircularProgress size={180} thickness={20} className='float-right' />
          </div>
        </div>
        : decks.map(deck => <Paper style={paperStyle} zDepth={1} key={deck.id}>
          <h3 style={{padding: '15px'}}>{deck.name}</h3>
        </Paper>)
      }
      <CreateDeckDialog subjectId={subjectId}/>
    </div>);
  }
}

function mapStateToProps(state) {
  const {decks} = state;

  return {decks: decks.items, load: decks.status === LOADING};
}

export default connect(mapStateToProps)(Decks);
