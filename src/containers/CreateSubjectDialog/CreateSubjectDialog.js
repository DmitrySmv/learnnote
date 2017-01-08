import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import { closeCreateSubjectDialog } from '../../redux/reducers/dialogs';
import { createSubject } from '../../redux/reducers/subjects';

class CreateSubjectDialog extends Component {
  close = () => {
    this.props.dispatch(closeCreateSubjectDialog());
  };

  addSubject = () => {
    this.props.dispatch(createSubject({
      name: this.subjectName
    }));
    this.close();
  };

  handleTextFieldChange = (e) => {
    this.subjectName = e.target.value;
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
        onClick={this.addSubject}
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
            floatingLabelText='Name of subject'
            fullWidth={true}
            ref={(input) => { this.input = input; }}
            onChange={this.handleTextFieldChange}
            onKeyPress={(e) => e.which === 13 && this.addSubject()}
          />
        </Dialog>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const {dialogs: {createSubject}} = state;

  return {
    open: createSubject.open
  };
};

export default connect(mapStateToProps)(CreateSubjectDialog);
