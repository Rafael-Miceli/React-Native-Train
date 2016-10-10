import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight
} from 'react-native';

import { AuthService } from './AuthService';
import Spinner from 'react-native-loading-spinner-overlay';

export class Login extends Component {

  constructor(props) {
      super(props)

      this.state = {
          username: "",
          password: "",
          showProgress: false
      };
  }  
    
  render() {

    var errocCtrl = <View />

    if (!this.state.success && this.state.badCredentials) {
        errocCtrl = <Text style={styles.errorText} >usuário ou senha incorretos</Text>; 
    }

    if (!this.state.success && this.state.unknownError) {
        errocCtrl = <Text style={styles.errorText}>Erro inesperado</Text>;
    }

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Bolo da Vovó Alzira
        </Text>

        {errocCtrl}

        <TextInput placeholder="Usuario" style={styles.input} onChangeText={(text) => this.setState({"username": text})}/>
        <TextInput placeholder="Senha" secureTextEntry={true} style={styles.input} onChangeText={(text) => this.setState({"password": text})}/>
        

        <TouchableHighlight style={styles.button} onPress={this.onLoginPressed.bind(this)}>
            <Text>Login</Text>
        </TouchableHighlight>

        <Spinner visible={this.state.showProgress} />

      </View>
    );
  }

  onLoginPressed() {
      this.setState({showProgress: true}); 

      let authService = new AuthService();

      authService.login({username: this.state.username, password: this.state.password},       
        (result) => {
            console.log(result);          
            
            if(result.success && this.props.onLogin){
                this.props.onLogin(); 
            }

            //result: {badCredentials, status, statusText, headers}
            this.setState(Object.assign({showProgress: false}, result));


      });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  input: {
      width: 200
  },
  button: {
      height: 50,
      backgroundColor: '#48BBEC',
      alignSelf: 'center',
      marginTop: 10,
      justifyContent: 'center',
      alignItems: 'center',
      width: 200
  }
});
