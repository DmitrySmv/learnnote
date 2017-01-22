import React, { Component } from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import { openCreateDeckDialog } from '../../redux/reducers/dialogs';
import { deleteDeck } from '../../redux/reducers/decks';
import CreateDeckDialog from '../../containers/CreateDeckDialog/CreateDeckDialog';
import { LOADING } from '../../redux/statuses';
import CircularProgress from 'material-ui/CircularProgress';
import Deck from '../../components/Deck/Deck';
import Grid from '../../components/Grid/Grid';

const createDeckButtonStyle = {
  marginTop: 26
};

class Decks extends Component {
  openDialog = () => {
    this.props.dispatch(openCreateDeckDialog());
  };

  render() {
    const {decks, params: {subjectId}, load, dispatch} = this.props;

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
        : <Grid columnsCount={3}>
            {decks.map(deck => (<Deck deck={deck} key={deck.id} onDelete={() => dispatch(deleteDeck(deck))}/>))}
          </Grid>
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
