import React from 'react';
import { Button, View, Text, ImageBackground } from 'react-native';
import { StackNavigator, TabBarBottom, TabNavigator } from 'react-navigation'; // Version can be specified in package.json
import TamUt from './TamUt';
class home extends React.Component {
  static navigationOptions = {
    header: null,
    };
  render() {
    return (
      <ImageBackground
      source={require('./src/wall.png')}
      style={{width: '100%', height: '100%'}}
    > 
          <View style={{ paddingTop: 500, alignItems: 'center', justifyContent: 'center' }}>
            <Button
              title=" Press Me Please ~ "
              onPress={() => this.props.navigation.navigate('Note')}
            />
          </View>
          </ImageBackground>
    );
  }
}

class view extends React.Component {
   static navigationOptions = {
    header: null,
    };
  render() {
    return (
      <TamUt />
    );
  }
}

const RootStack = StackNavigator(
  {
    Write: {
      screen: home,
    },
    Note: {
      screen: view,
    },
  },
  {
    initialRouteName: 'Write',
  }
);

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}