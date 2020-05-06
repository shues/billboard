import React from 'react';
import Logo from "./logo";
import {Navigate} from "./navigate";
import './index.css';

export default class Hight extends React.Component{
  render(){
    return(
      <div className="hight">
        <Logo />
        <Navigate />
      </div>
    );
  }
}
