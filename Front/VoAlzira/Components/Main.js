
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import { Login } from './Login'

export class Main extends Component {

  constructor() {
      super();

      this.state = {
          isLoggedIn: false 
      }
  }

  render() {
    return (
      <Login onLogin={this.onLogin.bind(this)} {...this.props}/>
    );
  }

  onLogin() {
    console.log("Logado!");    
    this.setState({isLoggedIn: true});    
  }
}

