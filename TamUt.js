import React from 'react';
import { Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Version can be specified in package.json
import { TabNavigator, TabBarBottom } from 'react-navigation'; // Version can be specified in package.json
import home from './Home';
import view from './View';

class HomeScreen extends React.Component {
  static navigationOptions = {
   header: null,
   };
 render() {
   return (
     <view />
   );
 }
}
class DetailScreen extends React.Component {
  static navigationOptions = {
   header: null,
   };
 render() {
   return (
     <home />
   );
 }
}

export default TabNavigator(
  {
    Write: { screen: home },
    Note: { screen: view },
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Write') {
          iconName = `ios-create${focused ? '' : '-outline'}`;
        } else if (routeName === 'Note') {
          iconName = `ios-list-box${focused ? '' : '-outline'}`;
        }

        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    tabBarOptions: {
      activeTintColor: 'black',
      inactiveTintColor: 'gray',
    },
    animationEnabled: true,
    swipeEnabled: false,
  }
);
