import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import { closeCreateDeckDialog } from '../../redux/reducers/dialogs';
import { createDeck } from '../../redux/reducers/decks';

class CreateDeckDialog extends Component {
  close = () => {
    this.props.dispatch(closeCreateDeckDialog());
  };

  addDeck = () => {
    this.props.dispatch(createDeck({
      name: this.deckName,
      subjectId: this.props.subjectId
    }));
    this.close();
  };

  handleTextFieldChange = (e) => {
    this.deckName = e.target.value;
  }

  componentDidUpdate() {
    setTimeout(() => {
      this.input && this.input.focus();
    }, 10);
  }

  render() {
    const actions = [
      <FlatButton
        label='Cancel'
        primary={true}
        onClick={this.close}
      />,
      <FlatButton
        label='Create'
        primary={true}
        onClick={this.addDeck}
      />
    ];

    return (
      <div>
        <Dialog
          actions={actions}
          modal={false}
          open={this.props && this.props.open}
        >
          <TextField
            floatingLabelText='Name of deck'
            fullWidth={true}
            ref={(input) => { this.input = input; }}
            onChange={this.handleTextFieldChange}
            onKeyPress={(e) => e.which === 13 && this.addDeck()}
          />
        </Dialog>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const {dialogs: {createDeck}} = state;

  return {
    open: createDeck.open
  };
};

export default connect(mapStateToProps)(CreateDeckDialog);
