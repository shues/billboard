import React from 'react';
import {UserPanel} from './userPanel';
import './index.css';

export class Lk extends React.Component{
  render(){
    return(
      <div>
        <UserPanel
          data={this.props.data}
        />
      </div>
    );
  }
}
