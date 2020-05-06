import React from 'react';
import './index.css';

export class Autorization extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      login: "",
      password: "",
      save: "",
    }
    this.changeLogin = this.changeLogin.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.autorization = this.autorization.bind(this);
    this.registration = this.registration.bind(this);
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

  autorization(){
    this.props.autorization(this.state.login, this.state.password);
  }

  registration(){
    this.props.startRegistration();
  }

  render(){
    return(
      <div
        className="autorizationForm"
      >
        <input type="text" value={this.state.login} onChange={this.changeLogin}></input>
        <input type="password" value={this.state.password} onChange={this.changePassword}></input>
        <div className="buttonSet">
          <button onClick={this.autorization}>Вход</button>
          <button onClick={this.registration}>Регистрация</button>
        </div>
      </div>
    )
  }
}
