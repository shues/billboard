import React from 'react';
import {Category} from './category';
import './index.css';

export class Catalog extends React.Component {
  render(){
//    console.log(this.props);
    const th = this;
    const categories = this.props.categories;
    const keyMass = Object.keys(categories);
    const catalog = keyMass.map(function(el,i){
      if(categories[el].parent === null){
        return (
          <Category
            name={categories[el].name}
            key={i}
            id={el}
            addCategory={th.props.addCategory}
            delCategory={th.props.delCategory}
            categories={categories}
            mode={th.props.mode}
          />)
      }
    });
     return(
       <div className="catalog">
        {catalog}
       </div>
    )
  }
}
