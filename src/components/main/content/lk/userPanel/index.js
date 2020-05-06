import React from 'react';
import './index.css';

export class UserPanel extends React.Component{
  render(){
    return(
      <div
        className="userPanel"
      >
        <button>Мои объявления</button>
        <button>Новое объявление</button>
        <span>{this.props.data.profile.info.name}</span>
        <button>Выйти</button>
      </div>
    )
  }
}
