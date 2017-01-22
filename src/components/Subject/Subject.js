import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import {ListItem} from 'material-ui/List';
import {grey400} from 'material-ui/styles/colors';

const activeStyle = {
  backgroundColor: grey400
};

const Subject = ({ subject, location }) => {
  const linkTo = `/dashboard/subjects/${subject.id}`;
  const SubjectLink = <Link to={linkTo} />;
  const style = linkTo === location ? activeStyle : null;

  return <ListItem
    primaryText={subject.name}
    containerElement={SubjectLink}
    style={style}
  />;
};

Subject.propTypes = {
  subject: PropTypes.object.isRequired
}

export default Subject;
