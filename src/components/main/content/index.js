import React from 'react';
import {Autorization} from './autorizationForm';
import {Registration} from './registrationForm';
import {Lk} from './lk';
import {BillSet} from './billSet';
import './index.css';

export class Content extends React.Component{
  constructor(props){
    super(props);
    this.checkLogin = this.checkLogin.bind(this);
    this.checkPassword = this.checkPassword.bind(this);
  }

  checkLogin(login) {
//    const login = this.state.login;
    let res = false;
    const reg = /^[a-zA-Z0-9_]{4,15}$/i;
    res = reg.test(login);
    return res;
  }

  checkPassword(pass){
//    const pass = this.state.password;
    let res = true;
    if(pass.length < 8 || pass.length > 15){
//      console.log(pass, 'length');
      return false
    }
    let reg = /[a-z]/;
    if(!reg.test(pass)){
//      console.log(pass, reg);
      return false;
    }
    reg = /[A-Z]/;
    if(!reg.test(pass)){
//      console.log(pass, reg);
      return false;
    }
    reg = /[0-9]/;
    if(!reg.test(pass)){
//      console.log(pass, reg);
      return false;
    }
    const test_arr = '!/?,:%№".;(){}[]^&*-_#@§><'.split('');
    for(let i = 0; i<test_arr.length; i++){
      let buf = pass.indexOf(test_arr[i]);
      if(buf !== -1){
//        console.log(pass, test_arr[i], buf);
        return false;
      }
    }

    return res;
  }

  render(){
    console.log(this.props);
    let content = null;
    switch(this.props.mode){
      case "autorization":
        content = <div className="content">
              <Autorization
                startRegistration={this.props.startRegistration}
                autorization = {this.props.autorization}
                checkLogin = {this.checkLogin}
                checkPassword = {this.checkPassword}
              />;
            </div>
        break;
      case "registration":
        content = <div className="content">
          <Registration
            checkLogin = {this.checkLogin}
            checkPassword = {this.checkPassword}
            makeRequest = {this.props.makeRequest}
            logout = {this.props.logout}
          />;
          </div>
        break;
      case "lk":
        content = <div className="content">
                    <Lk
                      data={this.props.lk}
                      logout = {this.props.logout}
                      categories={this.props.categories}
                    />
                  </div>
        break;
      case "admin":
        content = <div className="content">
                    <Lk
                      data={this.props.lk}
                      logout = {this.props.logout}
                      categories={this.props.categories}
                    />
                  </div>
        break;
      default:
        content =
            <div className="content">
              <Autorization
                startRegistration={this.props.startRegistration}
                autorization = {this.props.autorization}
                checkLogin = {this.checkLogin}
                checkPassword = {this.checkPassword}
              />;
            </div>
        break;
    }
    return content;
  }
}
