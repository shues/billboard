import React from 'react';
import './index.css';

export class Bill extends React.Component{
  render(){
    return(
      <div className="bill">
        <div className="bill_image"></div>
        <div className="bill_info"></div>
      </div>
    )
  }
}
