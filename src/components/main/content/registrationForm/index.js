import React from 'react';
import './index.css';

export class Registration extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      login: "",
      password: "",
      dubPassword: "",
      agreePersData: false,
    }
    this.changeLogin = this.changeLogin.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.changeDubPassword = this.changeDubPassword.bind(this);
    this.changeFlag = this.changeFlag.bind(this);
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

  changeFlag(e){
//    console.log(e.target.checked);
    this.setState({
      agreePersData: e.target.checked,
    })
  }

  render(){
    return(
      <div className="registration">
        <label>
          <b>E-mail</b>
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
        <label><input type="checkbox" onClick={this.changeFlag} style={{width:"20px"}} /> Согласие на обработку персональных данных</label>
        <button style={{width:"20px"}}>Регистрация</button>
      </div>
    )
  }
}
