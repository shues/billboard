import React from 'react';
import {Catalog} from './catalog';
import {Filter} from './filter';
import './index.css';

export class Side extends React.Component{
  render(){
    return(
      <div className="side">
        <Catalog
          mode = {this.props.mode}
          categories={this.props.categories}
          addCategory={this.props.addCategory}
          delCategory={this.props.delCategory}
        />
        <Filter />
      </div>
    );
  }
}
