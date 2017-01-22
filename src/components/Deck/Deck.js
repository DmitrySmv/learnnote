import React, { PropTypes } from 'react';
import {Card, CardActions, CardMedia, CardTitle} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import wireframe from './wireframe.png';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import LinearProgress from 'material-ui/LinearProgress';

const Deck = ({ deck, onDelete }) => (
  <Card style={{marginBottom: '1.5rem'}}>
    <div className='row'>
      <div className='large-9 columns'>
        <LinearProgress mode="determinate" value={30} style={{marginTop: '1.36rem'}} />
      </div>
      <IconMenu iconButtonElement={<IconButton><MoreVertIcon /></IconButton>} className='large-3 columns'>
        <MenuItem primaryText='Delete deck' leftIcon={<ActionDelete />} onTouchTap={onDelete}/>
      </IconMenu>
    </div>
    <CardMedia overlay={<CardTitle title={deck.name} />}>
      <img src={wireframe} role='presentation' />
    </CardMedia>
    <CardActions>
      <RaisedButton label='Learn' primary={true} fullWidth={true} />
    </CardActions>
  </Card>
);

Deck.propTypes = {
  deck: PropTypes.object.isRequired
}

export default Deck;
