import React, { Component } from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import { openCreateDeckDialog, closeCreateDeckDialog } from '../../redux/reducers/dialogs';
import { deleteDeck, createDeck } from '../../redux/reducers/decks';
import CreateDeckDialog from '../../components/CreateDeckDialog/CreateDeckDialog';
import { LOADING } from '../../redux/statuses';
import CircularProgress from 'material-ui/CircularProgress';
import Deck from '../../components/Deck/Deck';
import Grid from '../../components/Grid/Grid';

const buttonStyle = {
  marginTop: 26
};

class Decks extends Component {
  render() {
    const {decks, load, dispatch, isDialogOpened} = this.props;

    return (<div>
      <div className='row'>
        <h1 className='float-left'>Decks</h1>
        <RaisedButton label='+ Create Deck' className='float-right' primary={true} style={buttonStyle} onClick={this.openDialog}/>
      </div>
      {load ?
        <div className='row'>
          <div className='large-6 columns'>
            <CircularProgress size={180} thickness={20} className='float-right' />
          </div>
        </div>
        : <Grid columnsCount={3}>
            {decks.map(deck => (<Deck deck={deck} key={deck.id} onDelete={() => dispatch(deleteDeck(deck))}/>))}
          </Grid>
      }
      <CreateDeckDialog open={isDialogOpened} onClose={this.closeDialog} onCreate={this.createDeck}/>
    </div>);
  }

  openDialog = () => {
    this.props.dispatch(openCreateDeckDialog());
  };

  closeDialog = () => {
    this.props.dispatch(closeCreateDeckDialog());
  }

  createDeck = (name) => {
    this.props.dispatch(createDeck({
      name,
      subjectId: this.props.params.subjectId
    }));
  }
}

function mapStateToProps(state) {
  const {decks, dialogs: {createDeck}} = state;

  return {
    decks: decks.items, 
    load: decks.status === LOADING,
    isDialogOpened: createDeck.open
  };
}

export default connect(mapStateToProps)(Decks);
