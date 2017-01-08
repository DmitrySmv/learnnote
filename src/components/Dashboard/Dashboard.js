import React, { Component } from 'react';
import Sidebar from '../../containers/Sidebar/Sidebar';

class Dashboard extends Component {
  render() {
    const {location} = this.props;

    return (<div className='expanded row'>
      <div className='large-3 columns'>
        <Sidebar location={location.pathname}/>
      </div>
      <div className='large-9 columns'>
        {this.props.children}
      </div>
    </div>);
  }
}

export default Dashboard;
