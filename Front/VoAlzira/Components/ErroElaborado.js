import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight
} from 'react-native';

export class Erro extends Component {

  constructor(props) {
      super(props)
  }  
    
  render() {   

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          {this.props.mensagem}
        </Text>        

      </View>
    );
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
