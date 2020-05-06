import React from 'react';
import {Autorization} from './autorizationForm';
import {Registration} from './registrationForm';
import {Lk} from './lk';
import {BillSet} from './billSet';
import './index.css';

export class Content extends React.Component{
  render(){
    let content = null;
    switch(this.props.mode){
      case "autorization":
        content = <div className="content">
              <Autorization
                startRegistration={this.props.startRegistration}
                autorization = {this.props.autorization}
              />;
            </div>
        break;
      case "registration":
        content = <Registration />;
        break;
      case "lk":
        content = <div className="content">
                    <Lk data={this.props.lk} />
                    <BillSet />
                  </div>
        break;
      default:
        content =
            <div className="content">
              <Autorization
                startRegistration={this.props.startRegistration}
                autorization = {this.props.autorization}
              />;
            </div>
        break;
    }
    return content;
  }
}
