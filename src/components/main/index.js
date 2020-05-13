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
          name: "",
        },
        posts: {},
      },
      items: {},
    };
    this.autorization = this.autorization.bind(this);
    this.logout = this.logout.bind(this);

    this.categories = this.categories.bind(this);
    this.startRegistration = this.startRegistration.bind(this);

    this.addCategory = this.addCategory.bind(this);
    this.delCategory = this.delCategory.bind(this);
    this.setCurrentCategory = this.setCurrentCategory.bind(this);

    this.makeRequest = this.makeRequest.bind(this);
  }

  componentDidMount(){
    this.categories();
    this.items();
  }

  makeRequest(url){
//    console.log(url);
    return fetch(url)
      .then(function(res){
//        console.log(res);
        return res.json();
      })
      .catch(function(e){
        console.log('error ' + e);
      })
      .finally()
  }

  autorization(login, password){
    const url = "api/v1/autorization/login/?login=" + login + "&password=" + password;
    const th = this;
//    console.log(url);
    this.makeRequest(url).then(function(res){
      console.log(res);
        if(res['res'] === "ok"){
          const lk = res["data"];
          th.setProfile(lk);
        }
    });
//    const lk = {"profile":{"id":1,"name":"user"},"posts":{}};
//    this.setProfile(lk);
//    this.makeRequest(url).then((res)=>{
//      console.log(res);
//      if(res.result === "ok"){
//        this.setProfile(res.lk);
//      }
//    })
  }

  logout(){
    const lk = {
      profile: {
        id: null,
        name: "",
      },
      posts: {},
    };
    const mode = "autorization";
    this.setState({
      lk: lk,
      mode: mode,
    });
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
    const mode = (lk.profile.name === "admin")?"admin":"lk";
    this.setState({
      lk: lk,
      mode: mode,
    })
  }

  categories (){
//    const categories = {
//      "1":{
//        "name":"Category_1",
//        "parent":null,
//      },
//      "3":{
//        "name":"Category_2",
//        "parent":null,
//      },
//      "5":{
//        "name":"Category_3",
//        "parent":"7",
//      },
//      "7":{
//        "name":"Category_4",
//        "parent":"1",
//      },
//    }
    const th = this;
    const url = "api/v1/catalog/list/";
//    console.log(url);
    let categories = {};
    this.makeRequest(url).then(function(res){
//      console.log(res);
      if(res['res'] === "ok"){
        const data = res.data;
        const keys = Object.keys(data);
//        console.log(keys);
        keys.forEach(function(el){
//          let parent = (data[el].parent === null)?null:parseInt(data[el].parent);
          let newCat = {
            name: data[el].name,
            parent: data[el].parent,
          };
          categories[data[el].id] = newCat;
        });
      }
//      console.log(categories);
      const catalog = {
        categories: categories,
        currentCategory: null,
      }
      th.setState({
        catalog: catalog
      })
    })
  }

  items(){
    const items = {
      "1":{
        image:"null",
        category:"1",
        name:"item_1",
      },
      "2":{
        image:"null",
        category:"1",
        name:"item_2",
      },
      "3":{
        image:"null",
        category:"1",
        name:"item_3",
      },
      "4":{
        image:"null",
        category:"3",
        name:"item_4",
      },
      "5":{
        image:"null",
        category:"3",
        name:"item_5",
      },
      "6":{
        image:"null",
        category:"5",
        name:"item_6",
      },
      "7":{
        image:"null",
        category:"5",
        name:"item_7",
      },
      "8":{
        image:"null",
        category:"5",
        name:"item_8",
      },
      "9":{
        image:"null",
        category:"1",
        name:"item_9",
      },
      "10":{
        image:"null",
        category:"7",
        name:"item_10",
      },
      "11":{
        image:"null",
        category:"7",
        name:"item_11",
      },
    }
    this.setState({
      items: items,
    })
  }

  addCategory(name, parent){
    const url = "api/v1/catalog/addCategory/?name=" + name + "&parent="+parent;
    const th = this;
    this.makeRequest(url).then(function(res){
      if(res['res'] === "ok"){
        th.categories();
      }
    });

//    let catalog = this.state.catalog;
//    const newCat = {
//      name: name,
//      parent: parent,
//    }
//    let keys = Object.keys(catalog.categories);
//    let newId = parseInt(keys[keys.length-1]) + 1;
//    catalog.categories[newId] = newCat;
//    this.setState({
//      catalog: catalog,
//    })
  }

  delCategory(id){
    const url = "api/v1/catalog/delCategory/?id=" + id;
    const th = this;
    this.makeRequest(url).then(function(res){
      if(res['res'] === "ok"){
        th.categories();
      }
    });

//    let catalog = this.state.catalog;
//    delete catalog.categories[id];
//    this.setState({
//      catalog: catalog,
//    })
  }

  setCurrentCategory(id){
    let catalog = this.state.catalog;
    catalog.currentCategory = id;
    this.setState({
      catalog: catalog,
    });
  }

  render(){
//    console.log(this.state);
    return(
      <div className="main">
        <Side
          categories={this.state.catalog.categories}
          currentCategory = {this.state.catalog.currentCategory}
          mode={this.state.mode}
          addCategory = {this.addCategory}
          delCategory = {this.delCategory}
          setCurrentCategory = {this.setCurrentCategory}
        />
        <Content
          mode={this.state.mode}
          lk={this.state.lk}
          categories={this.state.catalog.categories}
          currentCategory={this.state.catalog.currentCategory}
          items = {this.state.items}
          autorization = {this.autorization}
          logout = {this.logout}
          startRegistration = {this.startRegistration}
          makeRequest = {this.makeRequest}
        />
      </div>
    );
  }
}
