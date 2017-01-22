import React, { Component } from 'react';
import { connect } from 'react-redux';
import {List} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import CreateSubjectDialog from '../CreateSubjectDialog/CreateSubjectDialog';
import { openCreateSubjectDialog } from '../../redux/reducers/dialogs';
import { deleteSubject } from '../../redux/reducers/subjects';
import { LOADING } from '../../redux/statuses';
import CircularProgress from 'material-ui/CircularProgress';
import Subject from '../../components/Subject/Subject';

const progressStyle = {
  marginLeft: 15
};

const buttonStyle = {
  marginTop: 15,
}

class Sidebar extends Component {
  openDialog = () => {
    this.props.dispatch(openCreateSubjectDialog());
  };

  render() {
    const {subjects, load, location, dispatch} = this.props;
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
          label='&#43; Create Subject'
          style={buttonStyle}
          fullWidth={true}
          onClick={this.openDialog}
          primary={true}
        />
        <CreateSubjectDialog />
      </List>
    );
  }
}

function mapStateToProps(state) {
  const {subjects} = state;

  return {subjects: subjects.items, load: subjects.status === LOADING };
}

export default connect(mapStateToProps)(Sidebar);
