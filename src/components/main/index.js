import React from 'react';
import {Side} from './side';
import {Content} from './content';
import './index.css';

export default class Main extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      mode: "autorization",
      catalog: {
        categories: {},
        currentCategory: null,
      },
      lk:{
        profile: {
          id: null,
          info: {
            name: "",
            avatar: "",
          },
          settings: {},
        },
        relations: {
          posts: {},
          comments: {},
        },
      },
      items: [],
    };
    this.autorization = this.autorization.bind(this);
    this.categories = this.categories.bind(this);
    this.startRegistration = this.startRegistration.bind(this);

    this.addCategory = this.addCategory.bind(this);
    this.delCategory = this.delCategory.bind(this);
  }

  componentDidMount(){
    this.categories();
  }

  makeRequest(url){
//    console.log(url);
    return fetch(url)
      .then(function(res){
//        console.log(res);
        return res.text();
      })
      .catch(function(e){
        console.log('error ' + e);
      })
      .finally()
  }

  autorization(login, password){
//    const url = "http://billboard.my/api/v1/autorization/login?login=" + login + "&password=" + password;
//    console.log(url);
    const lk = {"profile":{"id":1,"info":{"name":"user","avatar":"default_man"},"settings":{}},"relations":{"posts":{},"comments":{}}}
    this.setProfile(lk);
//    this.makeRequest(url).then((res)=>{
//      console.log(res);
//      if(res.result === "ok"){
//        this.setProfile(res.lk);
//      }
//    })
  }

  startRegistration(){
    this.setState({
      mode: "registration",
    })
  }

  registerUser(){
    const lk = {"profile":{"id":1,"info":{"name":"user","avatar":"default_man"},"settings":{}},"relations":{"posts":{},"comments":{}}}
    this.setProfile(lk);
  }

  setProfile(lk){
    this.setState({
      lk: lk,
      mode: "lk",
    })
  }

  categories (){
    const categories = {
      "1":{
        "name":"Category_1",
        "parent":null,
      },
      "3":{
        "name":"Category_2",
        "parent":null,
      },
      "5":{
        "name":"Category_3",
        "parent":"7",
      },
      "7":{
        "name":"Category_4",
        "parent":"1",
      },
    }
    const catalog = {
      categories: categories,
      currentCategory: null,
    }
    this.setState({
      catalog: catalog
    })
  }

  addCategory(name, parent){
    let catalog = this.state.catalog;
    const newCat = {
      name: name,
      parent: parent,
    }
    let keys = Object.keys(catalog.categories);
    let newId = parseInt(keys[keys.length-1]) + 1;
    catalog.categories[newId] = newCat;
    this.setState({
      catalog: catalog,
    })
  }

  delCategory(id){
    let catalog = this.state.catalog;
    delete catalog.categories[id];
    this.setState({
      catalog: catalog,
    })
  }

  render(){
//    console.log(this.state);
    return(
      <div className="main">
        <Side
          categories={this.state.catalog.categories}
          mode={this.state.mode}
          addCategory = {this.addCategory}
          delCategory = {this.delCategory}
        />
        <Content
          mode={this.state.mode}
          lk={this.state.lk}
          category={this.state.catalog.currentCategory}
          items = {this.state.items}
          autorization = {this.autorization}
          startRegistration = {this.startRegistration}
        />
      </div>
    );
  }
}
