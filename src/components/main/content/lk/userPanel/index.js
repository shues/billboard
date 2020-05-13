import React from 'react';
import './index.css';

export class UserPanel extends React.Component{
  constructor(props){
    super(props);

    this.logout = this.logout.bind(this);
    this.newPost = this.newPost.bind(this);
  }


  logout(){
    this.props.logout();
  }

  newPost(){

  }

  render(){
    return(
      <div className="userPanel">
        <button>Мои объявления</button>
        <button onClick={this.newPost} >Новое объявление</button>
        <span>{this.props.data.profile.name}</span>
        <button onClick={this.logout} >Выйти</button>
      </div>
    )
  }
}
