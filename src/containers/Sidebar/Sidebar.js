import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RaisedButton, CircularProgress, Divider, Subheader, List } from 'material-ui';
import { openCreateSubjectDialog, closeCreateSubjectDialog } from '../../redux/reducers/dialogs';
import { deleteSubject, createSubject } from '../../redux/reducers/subjects';
import { LOADING } from '../../redux/statuses';
import Subject from '../../components/Subject';
import CreateSubjectDialog from '../../components/CreateSubjectDialog';

const styles = {
  progress: {
    marginLeft: 15
  },
  button: {
    marginTop: 15
  }
}

class Sidebar extends Component {
  render() {
    const {subjects, load, location, dispatch, isDialogOpened} = this.props;
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
        {load && <CircularProgress style={styles.progress} />}
        <Divider />
        <RaisedButton
          label='+ Create Subject'
          style={styles.button}
          fullWidth={true}
          onClick={this.openDialog}
          primary={true}
        />
        <CreateSubjectDialog open={isDialogOpened} onClose={this.closeDialog} onCreate={this.createSubject} />
      </List>
    );
  }

  openDialog = () => {
    this.props.dispatch(openCreateSubjectDialog());
  }

  closeDialog = () => {
    this.props.dispatch(closeCreateSubjectDialog());
  }

  createSubject = (name) => {
    this.props.dispatch(createSubject({name}));
  }
}

function mapStateToProps(state) {
  const {subjects, dialogs: {createSubject}} = state;

  return {
    subjects: subjects.items, 
    load: subjects.status === LOADING,
    isDialogOpened: createSubject.open
  };
}

export default connect(mapStateToProps)(Sidebar);
