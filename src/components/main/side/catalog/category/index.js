import React from 'react';
import {
  SubCategory
} from './subCategory';
import './index.css';

export class Category extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showSub: false,
      prevent: "+",
    }
    this.switchSubCategory = this.switchSubCategory.bind(this);
    this.addCategory = this.addCategory.bind(this);
    this.delCategory = this.delCategory.bind(this);
  }

  switchSubCategory(e) {
    e.stopPropagation();
    this.setState({
      showSub: !this.state.showSub,
      prevent: this.state.prevent === "+" ? '-' : '+',
    })
  }

  addCategory(e) {
    e.stopPropagation();
    //    console.log(this.props);
    const name = prompt('Введите имя новой категории', "");
    if (name) {
      const parent = this.props.id;
      this.props.addCategory(name, parent);
    }
  }

  delCategory(e) {
    e.stopPropagation();
    const id = this.props.id;
    this.props.delCategory(id);
  }

  render() {
    const categories = this.props.categories;
    const keys = Object.keys(categories);
    let subData = {};
    const th = this;
    keys.forEach(function (el) {
      if (categories[el].parent === th.props.id) {
        subData[el] = categories[el];
      }
    })
    const subCategory = < SubCategory
      data = {subData}
      categories = {categories}
      addCategory = {this.props.addCategory}
      delCategory = {this.props.delCategory}
      key = {this.props.id + '_'}
      mode = {this.props.mode}
    />
    if (this.props.mode === "admin") {
      if (this.state.showSub) {
        return (
          <div className = "category">
            <button onClick = {this.switchSubCategory}>{this.state.prevent}</button>
            {this.props.name}
            <button onClick = {this.addCategory}> + </button>
            <button onClick = {this.delCategory}> - </button>
            {subCategory}
          </div>
        )
      }
      return (
        <div className = "category">
          <button onClick = {this.switchSubCategory}>{this.state.prevent}</button>
          {this.props.name}
          <button onClick = {this.addCategory}> + </button>
          <button onClick = {this.delCategory}> - </button>
        </div>
      );
    }
    if (this.state.showSub) {
      return (
        <div className = "category">
          <button onClick = {this.switchSubCategory}>{this.state.prevent}</button>
          {this.props.name}
          {subCategory}
        </div>
      )
    }
    return (
      <div className = "category">
        <button onClick = {this.switchSubCategory}>{this.state.prevent}</button>
        {this.props.name}
      </div>
    );
  }
}
