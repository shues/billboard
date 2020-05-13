import React from 'react';
import './index.css';

export class Registration extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      login: "",
      password: "",
      dubPassword: "",
      errMess:"",
    }
    this.changeLogin = this.changeLogin.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.changeDubPassword = this.changeDubPassword.bind(this);
    this.runRegistration = this.runRegistration.bind(this);
    this.checkLogin = this.checkLogin.bind(this);
    this.saveRegistrationData = this.saveRegistrationData.bind(this);
  }

  changeLogin(e){
    this.setState({
      login: e.target.value,
    })
  }

  changePassword(e){
    this.setState({
      password: e.target.value,
    })
  }

  changeDubPassword(e){
    this.setState({
      dubPassword: e.target.value,
    })
  }

  checkLogin(){
    console.log(this.props);
    const url = "api/v1/registration/checkLogin/?login=" + this.state.login;
    return this.props.makeRequest(url).then(function(res){
      return (res['res'] === "ok");
    });
  }

  runRegistration(){
    console.log(this.props);
    let errMess = "";
    const checkLog = this.props.checkLogin(this.state.login);
    const checkPass = this.props.checkPassword(this.state.password);

    if(!checkPass){
      errMess = "Введено недопустимое значение пароля"
    }
    if(this.state.password !== this.state.dubPassword){
      errMess = "Введенные пароли не совпадают";
    }
    if(!checkLog){
      errMess = "Введено недопустимое значение логина"
    }
    if(!this.checkLogin()){
      errMess = "Такой логин уже зарегистрирован"
    }else{
      this.saveRegistrationData();
    }
    this.setState({
      errMess: errMess,
    });
  }

  saveRegistrationData(){
    const url = "api/v1/registration/addNewUser/?login=" + this.state.login + "&password="+this.state.password;
    const th = this;
    this.props.makeRequest(url).then(function(res){
      if(res['res'] === "ok"){
        th.props.logout();
      }
    });
  }

  render(){
    return(
      <div className="registration">
        <label>
          <b>Логин</b>
          <input
            type="e-mail"
            value={this.state.login}
            onChange={this.changeLogin}
          >
          </input>
        </label>
        <label>
          <b>Пароль</b>
          <input
            type="password"
            value={this.state.password}
            onChange={this.changePassword}
          >
          </input>
        </label>
        <label>
          <b>Пароль еще раз</b>
          <input
            type="password"
            value={this.state.dubPassword}
            onChange={this.changeDubPassword}
          >
          </input>
        </label>
        <button
          style={{width:"200px"}}
          onClick={this.runRegistration}
        >Регистрация</button>
        <span>{this.state.errMess}</span>
      </div>
    )
  }
}
