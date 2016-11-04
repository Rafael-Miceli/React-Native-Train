
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Navigator,
  TouchableOpacity,
  ScrollView
} from 'react-native';

import { SideMenu } from 'react-native-side-menu';

import { SupplierList } from './SupplierList';

export class Home extends Component {

  constructor(props) {
      super(props);
      this._setNavigatorRef = this._setNavigatorRef.bind(this);
  }

  renderScene(route, navigator) {
    return <route.id navigatorFromRoute={navigator} params={route.params} title={route.title} />
  }

  render() {
      return (
        <Navigator
          ref={this._setNavigatorRef}
          initialRoute={{ id: SupplierList, title: 'Fornecedores' }}
          configureScene={() => Navigator.SceneConfigs.FloatFromRight}
          renderScene={this.renderScene} 
          navigationBar={
              <Navigator.NavigationBar style={styles.navBar}
                  routeMapper={NavigationBarRouteMapper} />
            } />
      );
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

}

const NavigationBarRouteMapper = {
  LeftButton(route, navigator, index, nextState) {
    switch(route.id.name) {
      case 'SupplierList':
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

const styles = StyleSheet.create({
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