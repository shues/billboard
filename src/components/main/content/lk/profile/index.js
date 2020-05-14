import React from 'react';
import './index.css';

export class Profile extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      login: "",
      password: "",
    }
    this.setCurrentLogin = this.setCurrentLogin.bind(this);
  }

  componentDidMount(){
    this.setCurrentLogin();
  }

  setCurrentLogin(){
    const login = this.props.data.profile.name;
    this.setState({
      login: login,
    })
  }

  render(){
    return(
      <div
        className="profileCont"
      >
        <label>
          <h4>Имя пользователя</h4>
          <input
            type="text"
            value={this.state.login}
            onChange = {this.changeLogin}>
          </input>
        </label>

        <label>
          <h4>Старый пароль</h4>
          <input
            type="text"
            value={this.state.login}
            onChange = {this.changeLogin}>
          </input>
        </label>

        <label>
          <h4>Новый пароль</h4>
          <input
            type="text"
            value={this.state.login}
            onChange = {this.changeLogin}>
          </input>
        </label>
        <label>
          <h4>Новый пароль</h4>
          <input
            type="text"
            value={this.state.login}
            onChange = {this.changeLogin}>
          </input>
        </label>

      </div>
    );
  }
}
