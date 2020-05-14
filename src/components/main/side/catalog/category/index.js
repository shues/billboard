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
    this.setCurrentCategory = this.setCurrentCategory.bind(this);
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

  setCurrentCategory(e){
    e.stopPropagation();
    const id = this.props.id;
    this.props.setCurrentCategory(id);
  }

  render() {
    console.log(this.props);
    const categories = this.props.categories;
    const keys = Object.keys(categories);
    let subData = {};
    const th = this;
    console.log(keys, categories);
    keys.forEach(function (el) {
      console.log(categories[el].parent, th.props.id);
      if (categories[el].parent === th.props.id) {
        subData[el] = categories[el];
      }
    })
    const subCategory = <SubCategory
      data = {subData}
      categories = {categories}
      addCategory = {this.props.addCategory}
      delCategory = {this.props.delCategory}
      key = {this.props.id + '_'}
      mode = {this.props.mode}
      setCurrentCategory = {this.props.setCurrentCategory}
      currentCategory = {this.props.currentCategory}
    />

    const categoryName = (this.props.id === this.props.currentCategory)?(<b>{this.props.name}</b>):this.props.name;

    const addButton = (this.props.mode === "admin")?(<button onClick = {this.addCategory}> + </button>):null;

    const delButton = (this.props.mode === "admin")?(<button onClick = {this.delCategory}> - </button>):null;

    const subCategoryShow = (this.state.showSub)?subCategory:null;
    return (
      <div className = "category" onClick={this.setCurrentCategory}>
        <button onClick = {this.switchSubCategory}>{this.state.prevent}</button>
        {categoryName}
        {addButton}
        {delButton}
        {subCategoryShow}
      </div>
    );
  }
}
