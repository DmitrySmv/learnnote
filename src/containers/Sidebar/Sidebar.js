import React, { Component } from 'react';
import { connect } from 'react-redux';
import {RaisedButton, CircularProgress, Divider, Subheader, List} from 'material-ui';
import Subject from '../../components/Subject/Subject';
import CreateSubjectDialog from '../../components/CreateSubjectDialog/CreateSubjectDialog';
import { openCreateSubjectDialog, closeCreateSubjectDialog } from '../../redux/reducers/dialogs';
import { deleteSubject, createSubject } from '../../redux/reducers/subjects';
import { LOADING } from '../../redux/statuses';

const progressStyle = {
  marginLeft: 15
};

const buttonStyle = {
  marginTop: 15,
}

class Sidebar extends Component {
  openDialog = () => {
    this.props.dispatch(openCreateSubjectDialog());
  }

  closeDialog = () => {
    this.props.dispatch(closeCreateSubjectDialog());
  }

  createSubject = (name) => {
    this.props.dispatch(createSubject({name}));
  }

  render() {
    const {subjects, load, location, dispatch, openDialog} = this.props;
    return (
      <List>
        <Subheader>SUBJECTS</Subheader>
        {subjects.map(subject =>
          <Subject
            subject={subject}
            location={location}
            onDelete={() => dispatch(deleteSubject(subject))}
            key={subject.id}
          />
        )}
        {load && <CircularProgress style={progressStyle} />}
        <Divider />
        <RaisedButton
          label='+ Create Subject'
          style={buttonStyle}
          fullWidth={true}
          onClick={this.openDialog}
          primary={true}
        />
        <CreateSubjectDialog open={openDialog} onClose={this.closeDialog} onCreate={this.createSubject} />
      </List>
    );
  }
}

function mapStateToProps(state) {
  const {subjects, dialogs: {createSubject}} = state;

  return {
    subjects: subjects.items, load: subjects.status === LOADING,
    openDialog: createSubject.open
  };
}

export default connect(mapStateToProps)(Sidebar);
