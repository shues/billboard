import React from 'react';
import {Category} from '../../category';
import './index.css';

export class SubCategory extends React.Component{
  render(){
//    console.log(this.props);
    let childrens = [];
    for(let key in this.props.data){
      let elem = <Category
          name={this.props.data[key].name}
          key={key}
          id={key}
          addCategory={this.props.addCategory}
          delCategory={this.props.delCategory}
          categories={this.props.categories}
          mode={this.props.mode}
        />
      childrens.push(elem);
    }
    return(
      <div
        className="subCategory"
      >
        {childrens}
      </div>
    );
  }
}
