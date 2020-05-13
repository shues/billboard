import React from "react";
import {NewBillForm} from './newBillForm';
import './index.css';

export class BillsManager extends React.Component{
  render(){
    return(
      <div className="billsManager">
        <NewBillForm
          categories={this.props.categories}
        />
      </div>
    );
  }
}
