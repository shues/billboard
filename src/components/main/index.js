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
        return res.text();
      })
      .catch(function(e){
        console.log('error ' + e);
      })
      .finally()
  }

  autorization(login, password){
    const url = "api/v1/autorization/login/?login=" + login + "&password=" + password;
    if(this.props.prod){
      const th = this;
      this.makeRequest(url).then(function(res){
        console.log(res);
          if(res['res'] === "ok"){
            const lk = res["data"];
            th.setProfile(lk);
          }
      });
    }else{
      const lk = '{"profile":{"id":"1","name":"' + login +'"},"posts":{}}';
      this.setProfile(JSON.parse(lk));
    }
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
    console.log(lk);
    const mode = (lk.profile.name === "admin")?"admin":"lk";
    this.setState({
      lk: lk,
      mode: mode,
    })
  }

  categories (){
    if(this.props.prod){
      const th = this;
      const url = "api/v1/catalog/list/";
      let categories = {};
      this.makeRequest(url).then(function(res){
        if(res['res'] === "ok"){
          const data = res.data;
          const keys = Object.keys(data);
          keys.forEach(function(el){
            let newCat = {
              name: data[el].name,
              parent: data[el].parent,
            };
            categories[data[el].id] = newCat;
          });
        }
        const catalog = {
          categories: categories,
          currentCategory: null,
        }
        th.setState({
          catalog: catalog
        })
      })
    }else{
      const categories = JSON.parse('{"6":{"id":"6","name":"\u043a\u0430\u0442\u0430\u043b\u043e\u0433","parent":null},"7":{"id":"7","name":"\u041e\u0434\u0435\u0436\u0434\u0430","parent":"6"},"8":{"id":"8","name":"\u041a\u0443\u0440\u0442\u043a\u0438","parent":"7"}}');
      const catalog = {
        categories: categories,
        currentCategory: null,
      }
      this.setState({
        catalog: catalog
      })
    }
  }

  items(){
    const items = '{"1":{image:"null",category:"1",name:"item_1",},"2":{image:"null",category:"1",name:"item_2",},"3":{image:"null",category:"1",name:"item_3",},"4":{image:"null",category:"3",name:"item_4",},"5":{image:"null",category:"3",name:"item_5",},"6":{image:"null",category:"5",name:"item_6",},"7":{image:"null",category:"5",name:"item_7",},"8":{image:"null",category:"5",name:"item_8",},"9":{image:"null",category:"1",name:"item_9",},"10":{image:"null",category:"7",name:"item_10",},"11":{image:"null",category:"7",name:"item_11",},}';
    this.setState({
      items: items,
    })
  }

  addCategory(name, parent){
    if(this.props.prod){
      const url = "api/v1/catalog/addCategory/?name=" + name + "&parent="+parent;
      const th = this;
      this.makeRequest(url).then(function(res){
        if(res['res'] === "ok"){
          th.categories();
        }
      });
    }else{
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
  }

  delCategory(id){
    if(this.props.prod){
      const url = "api/v1/catalog/delCategory/?id=" + id;
      const th = this;
      this.makeRequest(url).then(function(res){
        if(res['res'] === "ok"){
          th.categories();
        }
      });
    }else{
      let catalog = this.state.catalog;
      delete catalog.categories[id];
      this.setState({
        catalog: catalog,
      })
    }
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
          prod = {this.props.prod}
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
          prod = {this.props.prod}
        />
      </div>
    );
  }
}
