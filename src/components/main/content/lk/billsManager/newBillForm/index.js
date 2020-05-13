import React from 'react';
import {Catalog} from '../../../../side/catalog';
import './index.css';

export class NewBillForm extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      currentCategory: null,
      name: "",
      description: "",
    }

    this.setCurrentCategory = this.setCurrentCategory.bind(this);
    this.changeName = this.changeName.bind(this);
    this.changeDescription = this.changeDescription.bind(this);
    this.savePostToBase = this.savePostToBase.bind(this);
  }

  setCurrentCategory(id){
    const categories = this.props.categories;
    for(let key in categories){
      if(categories[key].parent === id){
        return;
      }
    }
    this.setState({
      currentCategory: id,
    })
  }

  changeName(e){
    this.setState({
      name: e.target.value,
    })
  }

  changeDescription(e){
    this.setState({
      description: e.target.textContent,
    })
  }

  savePostToBase(){
    const url = "api/v1/posts/create/?title="+this.state.name+"&category="+this.state.currentCategory+"&description=" + this.state.description;
  }

  render(){
    const categories = this.props.categories;
    const keys = Object.keys(categories);
    console.log(keys);
    return(
      <div className="newBillForm">
        <lable>
          <h4>Название объявления</h4>
          <input
            type="text"
            value = {this.state.name}
            onChange={this.changeName}
          >
          </input>
        </lable>
        <lable>
          <h4>Текст объявления</h4>
          <textarea
            textContent={this.state.description}
            onChange={this.changeDescription}
          >
          </textarea>
        </lable>
        <lable>
          <h4>Категория объявления</h4>
          <Catalog
            mode = "lk"
            categories={this.props.categories}
            setCurrentCategory = {this.setCurrentCategory}
            currentCategory = {this.state.currentCategory}
          />
        </lable>
        <button onClick={this.savePostToBase}>Сохранить</button>
      </div>
    );
  }
}
