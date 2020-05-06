import React from "react";
import './index.css';

export class Find extends React.Component{
  render(){
    return(
      <div className="find">
        <input type="text"></input>
        <button>Поиск</button>
      </div>
    );
  }
}
