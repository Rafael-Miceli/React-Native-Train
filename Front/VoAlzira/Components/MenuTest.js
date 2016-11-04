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

class FirstPage extends Component {
    render() {
      return (
        <View style={styles.page}><Text style={styles.pageContent}>First Page</Text></View>
      );    
  }
}

class FirstPageMenu extends Component {

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
                <FirstPage/>                
            </SideMenu>                
        );
    }
};

class SecondPage extends Component {
     render(){
         return(<Text>Page 2</Text>);
     }
}

class SecondPageMenu extends Component {
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

    onMenuItemSelected = (x) => {

      console.log('Papai pegou: ', x);

        this.setState({
            isOpen: false,      
            selectedItem: item,
        });
        //this.props.navigator.push({ id: item });
    }

    render() {

        const menu = <Menu onItemSelected={this.onMenuItemSelected} ProFilho={'Espirito-Santo'} navigator={this.props.navigator}/>;

        return (
            <SideMenu
              menu={menu}
              isOpen={this.state.isOpen}
              onChange={(isOpen) => this.updateMenuState(isOpen)}>
                <MenuButton onMenuPress={() => this.toggle()}/>                
                <SecondPage/>                
            </SideMenu>                
        );
    }
}

class ThirdPage extends Component {
     render(){
         return(<Text>Page 3</Text>);
     }
}

class ThirdPageMenu extends Component {
     render(){
         return(<Text>Page 3</Text>);
     }
}

export class MenuNavigator extends Component {

  constructor(props) {
    super(props);
    this._setNavigatorRef = this._setNavigatorRef.bind(this);
  }

  renderScene(route, nav) {
      return <route.id navigator={nav} />;
  }

  render() {
    return (
      <Navigator
        ref={this._setNavigatorRef}
        initialRoute={{id: FirstPageMenu}}
        renderScene={this.renderScene}
        configureScene={(route) => {
          if (route.sceneConfig) {
            return route.sceneConfig;
          }
          return Navigator.SceneConfigs.FloatFromBottom;
        }}
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

    var arrayEscrotoAqui = [{nome: 'fulano', idade: 18, pg: FirstPageMenu},
                            {nome: 'flavio', idade: 31, pg: SecondPageMenu},
                            {nome: 'Rafael', idade: 25, pg: FirstPageMenu},
                            {nome: 'Elaine', idade: 23, pg: FirstPageMenu}];

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

  //render() {

    // return (

    //   <ScrollView scrollsToTop={false} style={styles.menu}>

    //     <Text
    //       onPress={() => this.props.onItemSelected('first')}
    //       style={styles.item}>
    //       First
    //     </Text>

    //     <Text
    //       onPress={() => this.props.onItemSelected('second')}
    //       style={styles.item}>
    //       Second
    //     </Text>

    //     <Text
    //       onPress={() => this.props.onItemSelected('third')}
    //       style={styles.item}>
    //       Third
    //     </Text>

    //     <Text
    //       onPress={() => this.props.onItemSelected('second')}
    //       style={styles.item}>
    //       Second
    //     </Text>
    //   </ScrollView>
    // );
  //}
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
});
