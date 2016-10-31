
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

export class Menu extends Component {

  render() {
    return (
      <ScrollView scrollsToTop={false}>
        <View>          
          <Text>Your name</Text>
        </View>

        <Text
          onPress={() => this.props.onItemSelected('About')}
          >
          About
        </Text>

        <Text
          onPress={() => this.props.onItemSelected('Contacts')}
          >
          Contacts
        </Text>
      </ScrollView>
    );
  }
}

export class MenuButton extends Component {

  constructor(props) {
    super(props);
  }

  handlePress(e) {
    if (this.props.onPress) {
      this.props.onPress(e);
    }
  }

  render() {
    return (
      <TouchableOpacity
        onPress={this.handlePress.bind(this)}>
        <Text>{this.props.children}</Text>
      </TouchableOpacity>
    );
  }
}

export class PageTest extends Component {
  render() {
    return (
      <View>
        <Text>Pagina de teste</Text>
      </View>
    );
  }
}

export class HomeMenu extends Component {

  constructor(props) {
      super(props);

      this.state ={
        isOpen: false,
        selectedItem: 'About'
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
      this.setState({
          isOpen: false,      
          selectedItem: item,
      });
      //this.props.navigator.replace({ id: item });
  }

  render() {
      var menu = (<View><Menu onItemSelected={this.onMenuItemSelected}/></View>);

      return (
        <SideMenu
          menu={menu}
          isOpen={this.state.isOpen}
          onChange={(isOpen) => this.updateMenuState(isOpen)}>
            <PageTest/>
        </SideMenu>
      );

      // return (
      //     <SideMenu
      //       menu={menu}
      //       isOpen={this.state.isOpen}
      //       onChange={(isOpen) => this.updateMenuState(isOpen)}>
      //         <PageTest/>
      //     </SideMenu>                
      // );
  }

}



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