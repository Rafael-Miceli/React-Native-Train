
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native';

import { Supplier } from './Supplier';

var _navigate;

export class SupplierList extends Component {

  constructor(props) {
      super(props);

      _navigate = this.props.navigatorFromRoute;
  }

  navigateTo(route) {
      _navigate.push({id: route, title: 'Fornecedor', params: {
        key: 0,
        name: "teste" 
      }});      
  }

  render() {
    return (
        <View style={styles.container}>
            <Text style={styles.welcome}>
              Ingredientes
            </Text>

            <TouchableHighlight onPress={ () => this.navigateTo(Supplier) }>
                <Text>Forncedor fulano</Text>
            </TouchableHighlight>
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

