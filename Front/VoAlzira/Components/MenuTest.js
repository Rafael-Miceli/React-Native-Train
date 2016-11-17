'use strict';

import React, { Component } from 'react';
import {
  Navigator,
  AppRegistry,
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ListView
} from 'react-native';

import SideMenu from 'react-native-side-menu';
import { SupplierList } from './SupplierList';

var _navi;

class SupplierListMenu extends Component {

    constructor(props) {
        super(props);
        this.state = {
          isOpen: false
        };
    }

    toggle() {
        this.setState({
          isOpen: !this.state.isOpen,
        });
    }

    updateMenuState(isOpen) {
        this.setState({ isOpen, });
    }

    onMenuItemSelected = (item) => {

      console.log('Papai pegou: ', item);

        this.setState({
            isOpen: false,      
            selectedItem: item,
        });
        //this.props.navigator.replace({ id: item }); 
    }

    render() {

        const menu = <Menu onItemSelected={this.onMenuItemSelected} ProFilho={'Espirito-Santo'} navigator={this.props.navigator}/>;

        return (
            <SideMenu
              menu={menu}
              isOpen={this.state.isOpen}
              onChange={(isOpen) => this.updateMenuState(isOpen)}>
                <MenuButton onMenuPress={() => this.toggle()}/>                
                <SupplierList navigatorFromRoute={_navi} title="Fornecedores" />                
            </SideMenu>                
        );
    }
};

export class VovoNavigator extends Component {

  constructor(props) {
    super(props);
    this._setNavigatorRef = this._setNavigatorRef.bind(this);
  }

  renderScene(route, nav) {
      _navi = nav;
      return <route.id navigatorFromRoute={nav} params={route.params} title={route.title} />;
  }

  render() {
    return (
      <Navigator
        ref={this._setNavigatorRef}
        initialRoute={{id: SupplierListMenu, title: 'Fornecedores'}}
        renderScene={this.renderScene}
        configureScene={(route) => {
          if (route.sceneConfig) {
            return route.sceneConfig;
          }
          return Navigator.SceneConfigs.FloatFromBottom;
        }}
        navigationBar={
          <Navigator.NavigationBar style={styles.navBar}
              routeMapper={NavigationBarRouteMapper} />
        }
      />
    );
  }

  componentWillUnmount() {
    this._listeners && this._listeners.forEach(listener => listener.remove());
  }

  _setNavigatorRef(navigator) {
    if (navigator !== this._navigator) {
      this._navigator = navigator;

      if (navigator) {
        var callback = (event) => {
          console.log(
            `NavigatorMenu: event ${event.type}`,
            {
              route: JSON.stringify(event.data.route),
              target: event.target,
              type: event.type,
            }
          );
        };
        // Observe focus change events from the owner.
        this._listeners = [
          navigator.navigationContext.addListener('willfocus', callback),
          navigator.navigationContext.addListener('didfocus', callback),
        ];
      }
    }
  }
};

const NavigationBarRouteMapper = {
  LeftButton(route, navigator, index, nextState) {
    switch(route.id.name) {
      case 'SupplierListMenu':
        return null
      default:
        return (
            <TouchableOpacity style={styles.navBarLeftButton}
              onPress={() => navigator.pop()}>
            <Text style={styles.navBarLeftText}>
              {'<'}
            </Text>
          </TouchableOpacity>
        )
    }
  },

  RightButton(route, navigator, index, nextState) {
    return null;
  },

  Title(route, navigator, index, nextState) {
    return (<Text >{route.title}</Text>);    
  }
}

class MenuButton extends Component {

  handlePress(e) {
    if (this.props.onMenuPress) {
      this.props.onMenuPress(e);
    }
  }

  render() {
    return (
      <View style={styles.menuButton} >
        <TouchableOpacity 
          onPress={this.handlePress.bind(this)}
          style={this.props.style}>
          <Text>{this.props.children}</Text>
          <Image
            source={{ uri: 'http://i.imgur.com/vKRaKDX.png', width: 40, height: 40, }} />        
        </TouchableOpacity>      
      </View>
    );
  }
}

class Menu extends Component {

  static propTypes = {
    onItemSelected: React.PropTypes.func.isRequired,
  };

  constructor(props) {
      super(props);

      var ds = new ListView.DataSource({
          rowHasChanged: (r1, r2) => r1 != r2
      });

      this.state = {
          dataSource: ds,
          showProgress: true
      };
  }

  componentDidMount() {
    console.log("Peguei do meu pai: ", this.props.ProFilho);

    var arrayEscrotoAqui = [{nome: 'fulano', idade: 18, pg: SupplierListMenu},
                            {nome: 'flavio', idade: 31, pg: SupplierListMenu},
                            {nome: 'Rafael', idade: 25, pg: SupplierListMenu},
                            {nome: 'Elaine', idade: 23, pg: SupplierListMenu},
                            {nome: 'Elaine', idade: 23, pg: SupplierListMenu}];

    this.setState({
          dataSource: this.state.dataSource.cloneWithRows(arrayEscrotoAqui),
          showProgress: false
      });
  }

  render() {

    return (

      <ScrollView scrollsToTop={false} style={styles.menu}>
        <ListView 
                    dataSource={this.state.dataSource}
                    renderRow={this.buildRow.bind(this)} />
      </ScrollView>
    );
  }

  buildRow(rowData){
      return (
          <Text
          onPress={() => this.props.onItemSelected('Passei para o pai')}
          style={styles.item}>
          {rowData.nome}
        </Text>
      );
  }
};

var styles = StyleSheet.create({
    menuButton: {
        marginTop: 20,
        backgroundColor: '#777'
    },
    menu: {
      flex: 1,
      width: window.width,
      height: window.height,
      padding: 20,
    },
    item: {
      fontSize: 16,
      fontWeight: '300',
      paddingTop: 20,
    },    
    page: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#777'
    },
    pageContent: {
        flex: 1,
        alignItems: 'center',
        top: 200,
    },   
    navBar: {
        backgroundColor:'#55ACEE',
        justifyContent: 'center',
        alignItems: 'center'
    },
    navBarLeftButton: {
        flex: 1, 
        padding: 20
    },
    navBarLeftText: {
        color: '#333', 
        fontWeight: 'bold'
    },
    titleText: {
        alignSelf: 'center',
        color: '#F2F2F2',
        fontSize: 20,
        fontWeight: 'bold',
        padding: 40,
        marginTop: 10
    }

});
