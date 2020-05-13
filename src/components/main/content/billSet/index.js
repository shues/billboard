import React from 'react';
import {Bill} from './bill';
import './index.css';

export class BillSet extends React.Component{
  render(){
    //console.log(this.props);
    let set = [];
    const items = this.props.items;
    for(let key in items){
      if(items[key].category === this.props.currentCategory){
        let bill = <Bill category={items[key].category} key={key}/>
        set.push(bill);
      }
    }
    return(
      <div className="billSet">
        {set}
      </div>
    );
  }
}
