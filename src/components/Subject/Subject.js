import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import {ListItem} from 'material-ui/List';
import {grey400} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';

const activeStyle = {
  backgroundColor: grey400
};

const iconButtonElement = (
  <IconButton touch={true} tooltipPosition='bottom-left'>
    <MoreVertIcon />
  </IconButton>
);

const Subject = ({ subject, location, onDelete }) => {
  const linkTo = `/dashboard/subjects/${subject.id}`;
  const SubjectLink = <Link to={linkTo} />;
  const style = linkTo === location ? activeStyle : null;

  const rightIconMenu = (
    <IconMenu iconButtonElement={iconButtonElement}>
      <MenuItem onTouchTap={onDelete}>Delete</MenuItem>
    </IconMenu>
  );

  return <ListItem
    primaryText={subject.name}
    containerElement={SubjectLink}
    rightIconButton={rightIconMenu}
    style={style}
  />;
};

Subject.propTypes = {
  subject: PropTypes.object.isRequired
}

export default Subject;
