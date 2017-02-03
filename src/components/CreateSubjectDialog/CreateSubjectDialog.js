import React, { Component, PropTypes } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

class CreateSubjectDialog extends Component {
  create = () => {
    this.props.onCreate(this.subject);
    this.close();
  }

  close = () => {
    this.props.onClose();
  }

  handleTextFieldChange = (e) => {
    this.subject = e.target.value;
  }

  componentDidUpdate() {
    setTimeout(() => {
      this.input && this.input.focus();
    }, 10);
  }

  render() {
    const actions = [
      <FlatButton label='Cancel' primary={true} onTouchTap={this.close} />,
      <FlatButton label='Create' primary={true} onTouchTap={this.create} />
    ];

    return (
      <Dialog actions={actions} modal={false} open={this.props.open}>
        <TextField
          floatingLabelText='Name of subject'
          fullWidth={true}
          ref={(input) => { this.input = input; }}
          onChange={this.handleTextFieldChange}
          onKeyPress={(e) => e.which === 13 && this.create()}
        />
      </Dialog>
    );
  }
}

CreateSubjectDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onCreate: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired
}

export default CreateSubjectDialog;
