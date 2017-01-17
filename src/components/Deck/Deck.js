import React, { PropTypes } from 'react';
import {Card, CardActions, CardMedia, CardTitle} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import wireframe from './wireframe.png';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

const Deck = ({ deck }) => (
  <Card style={{marginBottom: '1.5rem'}}>
    <div className='row'>
      <CardTitle title={deck.name} style={{fontSize: '0.1rem'}} className='large-9 columns'/>
      <IconMenu iconButtonElement={<IconButton><MoreVertIcon /></IconButton>} className='large-3 columns' style={{marginTop: '0.75rem'}}>
        <MenuItem primaryText='Delete deck' leftIcon={<ActionDelete />} />
      </IconMenu>
    </div>
    <CardMedia>
      <img src={wireframe} />
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
