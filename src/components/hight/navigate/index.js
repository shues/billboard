import React from 'react';
import {Autorization} from './autorization';
import {Menu} from "./menu";
import './index.css';

export class Navigate extends React.Component{
  render(){
    return(
      <div className="navigate">
        <Autorization />
        <Menu />
      </div>
    );
  }
}
