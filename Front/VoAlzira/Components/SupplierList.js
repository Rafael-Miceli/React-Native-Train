
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  ListView
} from 'react-native';

import { Supplier } from './Supplier';

var _navigate;

export class SupplierList extends Component {

  constructor(props) {
      super(props);

      console.log("iniciando SupplierList");

      _navigate = this.props.navigatorFromRoute;

      var ds = new ListView.DataSource({
          rowHasChanged: (r1, r2) => r1 != r2
      });

      this.state = {
          dataSource: ds,
          showProgress: true
      };
  }

  componentDidMount(){
    console.log("Montou component");

    this.fetchFeed();
  }

  fetchFeed(){      
      var url = 'http://10.0.3.2:5000/api/ingredientes';         
          
      // fetch(url, {})
      // .then((response)=> response.json())
      // .then((responseData)=> {

      //     var feedItems = responseData;

      //     console.log("feedItems", feedItems);
      //     console.log("DataSource: ", this.state.dataSource);

      //     this.setState({
      //         dataSource: this.state.dataSource.cloneWithRows(feedItems),
      //         showProgress: false
      //     });
      // })

      var arrayEscrotoAqui = [{nome: 'fulano', idade: 18},
                            {nome: 'flavio', idade: 31},
                            {nome: 'Rafael', idade: 25},
                            {nome: 'Elaine', idade: 23}];
      
      this.setState({
          dataSource: this.state.dataSource.cloneWithRows(arrayEscrotoAqui),
          showProgress: false
      });      
  }

  buildRow(rowData){
      console.log("RowData", rowData);

      return (
          <View style={{
              flex: 1,
              flexDirection: 'row',
              padding: 20,
              alignItems: 'center',
              borderColor: '#D7D7D7',
              borderBottomWidth: 1
          }}>

            <TouchableHighlight onPress={() => {_navigate.push({id: Supplier, title: 'Fornecedor', params: {
        key: rowData,
        name: "teste" 
      }})}}>
                <View style={{
                    paddingLeft: 20
                }}>
                    <Text style={{backgroundColor: '#fff'}}>
                        {rowData.nome}
                    </Text>
                    <Text style={{backgroundColor: '#fff'}}>
                        {rowData.idade}
                    </Text>
                </View>
            </TouchableHighlight>
          </View>
      );
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
            <View style={{
                flex: 1,
                justifyContent: 'flex-start',
                marginTop: 50
            }}>
                <ListView 
                    dataSource={this.state.dataSource}
                    renderRow={this.buildRow.bind(this)} />
            </View>            
        </View>            
    );
  }
}

/*

[
  {nome: fulano, idade: 18},
  {nome: flavio, idade: 31},
  {nome: Rafael, idade: 25},
  {nome: Elaine, idade: 23},
]

*/

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

