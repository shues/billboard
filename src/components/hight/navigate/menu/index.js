import React from 'react';
import {Find} from './find';
import './index.css';

export class Menu extends React.Component{
  render(){
    return(
      <div className="menu">
        <button>Кнопка 1</button>
        <button>Кнопка 2</button>
        <button>Кнопка 3</button>
        <Find />
      </div>
    );
  }
}
