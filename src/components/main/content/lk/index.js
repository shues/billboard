import React from 'react';
import {UserPanel} from './userPanel';
import {BillsManager} from './billsManager';
import './index.css';

export class Lk extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      mode: "normal",
    };
  }

  newPost(){
    this.setState({
      mode: "addPost",
    })
  }

  render(){
    let content = <BillsManager
                    mode = {this.state.mode}
                    categories={this.props.categories}
                  />
    return(
      <div>
        <UserPanel
          data={this.props.data}
          logout = {this.props.logout}
        />
        {content}
      </div>
    );
  }
}
