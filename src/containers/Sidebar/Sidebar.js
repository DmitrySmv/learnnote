import React, { Component } from 'react';
import { connect } from 'react-redux';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import CreateSubjectDialog from '../CreateSubjectDialog/CreateSubjectDialog';
import { openCreateSubjectDialog } from '../../redux/reducers/dialogs';
import { LOADING } from '../../redux/statuses';
import CircularProgress from 'material-ui/CircularProgress';
import { Link } from 'react-router';
import {grey400} from 'material-ui/styles/colors';

const progressStyle = {
  marginLeft: 15
};

const buttonStyle = {
  marginTop: 15,
}

const activeStyle = {
  backgroundColor: grey400
};

class Sidebar extends Component {
  openDialog = () => {
    this.props.dispatch(openCreateSubjectDialog());
  };

  render() {
    const {subjects, load, location} = this.props;
    return (
      <List>
        <Subheader>SUBJECTS</Subheader>
        {subjects.map(subject => {
          const linkTo = `/dashboard/subjects/${subject.id}`;
          const SubjectLink = <Link to={linkTo} />;
          const style = linkTo === location ? activeStyle : null;
          return <ListItem primaryText={subject.name} key={subject.id} containerElement={SubjectLink} style={style} />;
        })}
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
