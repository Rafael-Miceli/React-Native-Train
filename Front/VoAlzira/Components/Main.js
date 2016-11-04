
import React, { Component } from 'react';
import {
  StyleSheet,
  Text, 
  View
} from 'react-native';

import { Login } from './Login';
import { Home } from './Home';
import {MenuNavigator} from './MenuTest';
import { AuthService } from './AuthService';

export class Main extends Component {

  constructor() {
      super();

      this.state = {
          isLoggedIn: false 
      }
  }

  componentWillMount() {
      //Verificar se ja esta logado

      var authService = new AuthService();

      authService.getUser((token) => {

        console.log("token: ", token);

        if(token)
        {
          this.setState({
            isLoggedIn: true
          })  
        }
      })   

  }

  render() {

    if (this.state.isLoggedIn) {
      return (
        <MenuNavigator />
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

