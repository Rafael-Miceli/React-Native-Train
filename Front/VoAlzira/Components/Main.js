
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import { Login } from './Login'
import { Home } from './Home'

export class Main extends Component {

  constructor() {
      super();

      this.state = {
          isLoggedIn: false 
      }
  }

  render() {

    if (this.state.isLoggedIn) {
      return (
        <Home caraLoago={this.state.nomeDoCandango}/>
      );
    }
    else {
      return (
        <Login onLogin={this.onLogin.bind(this)} {...this.props}/>
      );
    }    
  }

  onLogin() {
    console.log("Logado!");    
    this.setState({isLoggedIn: true});    
  }
}

